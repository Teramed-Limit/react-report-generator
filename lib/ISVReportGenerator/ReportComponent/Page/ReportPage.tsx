import React, { useCallback, useMemo, useRef } from 'react';

import * as R from 'ramda';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { useRepComponentTool } from '../../../hooks/useRepComponentTool.ts';
import {
	activeCompAttributeAtom,
	activePageAtom,
	activePageAttributeAtom,
	activeUidAtom,
	createRepCompTypeAtom,
	footerDefineAtom,
	headerDefineAtom,
} from '../../../recoil/atoms/header-footer-defineAtom.ts';
import { RepComponent, ReportComponentType } from '../../../types/report-generator/component/rep-component.ts';
import { Point } from '../../../types/report-generator/rep-report.ts';
import { generateUUID } from '../../../utils/general.ts';
import RendererReportComponent from '../Components/RendererReportComponent';

import PagePaddingPseudo from './PagePaddingPseudo/PagePaddingPseudo';
import classes from './ReportPage.module.scss';

interface Props {
	pageName: 'Header' | 'Footer';
}

type RepComponentHandle = React.ElementRef<typeof RendererReportComponent>;

// 常數提取到組件外部，避免每次渲染重建
const SCALE = 1.33445378;

function ReportPage({ pageName }: Props) {
	// 從 Recoil atom 讀取最新的 page 值
	const page = useRecoilValue(pageName === 'Header' ? headerDefineAtom : footerDefineAtom);
	const setActivePage = useSetRecoilState(activePageAtom);
	const setActivePageAttribute = useSetRecoilState(activePageAttributeAtom);
	const [createRepCompType, setCreateRepCompType] = useRecoilState(createRepCompTypeAtom);
	const setActiveCompUUid = useSetRecoilState(activeUidAtom);
	const [activeCompAttribute, setActiveCompAttribute] = useRecoilState(activeCompAttributeAtom);

	// 使用 useRef 建立 ref 變數，用於獲取並操作 DOM 元素
	const pageRef = useRef<HTMLDivElement | null>(null);

	// 正在使用的元件
	const { onGenerate } = useRepComponentTool(createRepCompType);

	// 移動狀態
	const isMoving = useRef(false);
	const startMove = useRef(false);

	// 定義元件的 ref 和狀態
	const repComponentRef = useRef<Record<string, RepComponentHandle>>({});
	const activeComponentRef = useRef<Record<string, RepComponent>>({});
	const copyComponentRef = useRef<Record<string, RepComponent>>({});

	const restrictBoundary = useCallback(
		(oriPoint: Point, movePoint: Point, targetRect: DOMRect): Point => {
			const destPoint = {
				x: oriPoint.x + movePoint.x / SCALE,
				y: oriPoint.y + movePoint.y / SCALE,
			};

			if (destPoint.x < 0) destPoint.x = 0;
			if (destPoint.y < 0) destPoint.y = 0;

			if (destPoint.x <= page.paddingLeft / SCALE) destPoint.x = page.paddingLeft / SCALE;
			if (destPoint.y <= page.paddingTop / SCALE) destPoint.y = page.paddingTop / SCALE;

			if (destPoint.x >= page.width - targetRect.width / SCALE - page.paddingRight / SCALE)
				destPoint.x = page.width - targetRect.width / SCALE - page.paddingRight / SCALE;

			if (destPoint.y > page.height - targetRect.height / SCALE - page.paddingBottom / 2)
				destPoint.y = page.height - targetRect.height / SCALE - page.paddingBottom / 2;

			return destPoint;
		},
		[page.paddingLeft, page.paddingTop, page.paddingRight, page.paddingBottom, page.width, page.height],
	);

	// 計算滑鼠在實際頁面上的位置
	const calculateMouseToPageActuallyPos = useCallback((e: React.MouseEvent): Point => {
		if (!pageRef.current) return { x: 0, y: 0 };
		const boundingClientRect = pageRef.current.getBoundingClientRect();
		const x = e.pageX - boundingClientRect.x;
		const y = e.pageY - boundingClientRect.y;
		return { x: x / SCALE, y: y / SCALE };
	}, []);

	const onSaveCompPosition = useCallback(() => {
		setActivePageAttribute((prev) => {
			let newPage = { ...prev };

			Object.keys(activeComponentRef.current)?.forEach((uuid) => {
				if (!repComponentRef.current[uuid]) return;

				const pos = repComponentRef.current[uuid].getCompPosition();
				const comp = newPage.components[uuid];

				newPage = {
					...newPage,
					components: R.assocPath(
						[uuid],
						{ ...comp, x: pos.x / SCALE, y: pos.y / SCALE },
						newPage.components,
					),
				};
			});

			return newPage;
		});
	}, [setActivePageAttribute]);

	// 標記所有元件停止動作
	const deactivateAllComponent = useCallback(() => {
		activeComponentRef.current = {};
		Object.keys(repComponentRef.current)?.forEach((uuid) => {
			repComponentRef.current[uuid]?.deactivateComp();
		});
	}, []);

	// Active選中的原件，和是否停用所有元件
	const activateComponent = useCallback(
		(comp: RepComponent, deactivateOthers: boolean) => {
			if (deactivateOthers) deactivateAllComponent();
			activeComponentRef.current[comp.uuid] = comp;
			Object.keys(repComponentRef.current).forEach((uuid) => {
				if (comp.uuid === uuid) {
					repComponentRef.current[uuid]?.activeComp();
				}
			});
		},
		[deactivateAllComponent],
	);

	const onMouseDown = useCallback(() => {
		const remainActiveComp = Object.values(activeComponentRef.current)[0];
		isMoving.current = false;
		setActivePage(page.name);
		if (remainActiveComp) {
			setActiveCompUUid(remainActiveComp.uuid);
		}
		startMove.current = Object.keys(activeComponentRef.current)?.some((uuid) => {
			return repComponentRef.current[uuid]?.movable();
		});
	}, [page.name, setActivePage, setActiveCompUUid]);

	const onMouseMove = useCallback((e: React.MouseEvent) => {
		if (!startMove.current) return;

		isMoving.current = true;
		Object.keys(activeComponentRef.current)?.forEach((uuid) => {
			repComponentRef.current[uuid]?.moveCompPosition({
				x: e.movementX,
				y: e.movementY,
			});
		});
	}, []);

	const onMouseUp = useCallback(
		(e: React.MouseEvent) => {
			if (!isMoving.current) {
				const addedComp = onGenerate(e, calculateMouseToPageActuallyPos(e));
				if (addedComp) {
					deactivateAllComponent();
					setActivePageAttribute((p) => ({
						...p,
						components: R.assocPath([addedComp.uuid], addedComp, p.components),
					}));
					activateComponent(addedComp, false);
					setCreateRepCompType(ReportComponentType.General);
				}
			}
			isMoving.current = false;
			startMove.current = false;

			Object.keys(activeComponentRef.current)?.forEach((uuid) => {
				if (!repComponentRef.current[uuid]) return;
				const pos = repComponentRef.current[uuid].getCompPosition();
				activeComponentRef.current[uuid] = {
					...activeComponentRef.current[uuid],
					x: pos.x,
					y: pos.y,
				};
			});
		},
		[
			onGenerate,
			calculateMouseToPageActuallyPos,
			deactivateAllComponent,
			setActivePageAttribute,
			activateComponent,
			setCreateRepCompType,
		],
	);

	const onMouseLeave = useCallback(() => {
		isMoving.current = false;
		startMove.current = false;
		onSaveCompPosition();
	}, [onSaveCompPosition]);

	const onClick = useCallback(() => {
		setActivePage(page.name);
	}, [page.name, setActivePage]);

	const handleCopy = useCallback(() => {
		copyComponentRef.current = activeComponentRef.current;
	}, []);

	const handlePaste = useCallback(() => {
		setActivePageAttribute((prev) => {
			let updatedPage = { ...prev };
			Object.values(copyComponentRef.current).forEach((v) => {
				const addComp = {
					...v,
					uuid: generateUUID(),
					x: v.x + 15,
					y: v.y + 15,
				} as RepComponent;
				updatedPage = R.assocPath(['components', addComp.uuid], addComp, updatedPage);
			});
			return updatedPage;
		});
		deactivateAllComponent();
	}, [setActivePageAttribute, deactivateAllComponent]);

	const handleMovement = useCallback((movement: { x: number; y: number }) => {
		Object.keys(activeComponentRef.current)?.forEach((uuid) => {
			repComponentRef.current[uuid]?.moveCompPosition(movement);
		});
	}, []);

	const handleDelete = useCallback(() => {
		const cache = { ...activeComponentRef.current };
		deactivateAllComponent();
		setActivePageAttribute((prev) => {
			let updatedPage = { ...prev };
			Object.values(cache).forEach((comp) => {
				delete repComponentRef.current[comp.uuid];
				updatedPage = R.dissocPath(['components', comp.uuid], updatedPage);
			});
			return updatedPage;
		});
	}, [deactivateAllComponent, setActivePageAttribute]);

	const onKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.ctrlKey) {
				switch (e.code) {
					case 'KeyC':
						handleCopy();
						break;
					case 'KeyV':
						handlePaste();
						break;
					case 'ArrowLeft':
						handleMovement({ x: -1, y: 0 });
						break;
					case 'ArrowRight':
						handleMovement({ x: 1, y: 0 });
						break;
					case 'ArrowUp':
						handleMovement({ x: 0, y: -1 });
						break;
					case 'ArrowDown':
						handleMovement({ x: 0, y: 1 });
						break;
					default:
						break;
				}
			}

			if (e.code === 'Delete') {
				handleDelete();
			}
		},
		[handleCopy, handlePaste, handleMovement, handleDelete],
	);

	const onCompValueChanged = useCallback(
		(uuid: string, attrPath: (number | string)[], attrValue: number | string | boolean) => {
			if (!activeCompAttribute) return;
			const newValue = R.assocPath([...attrPath], attrValue, activeCompAttribute);
			setActiveCompAttribute(newValue);
		},
		[activeCompAttribute, setActiveCompAttribute],
	);

	// 建立穩定的 ref callback
	const setComponentRef = useCallback((uuid: string) => {
		return (ref: RepComponentHandle | null) => {
			if (!ref) return;
			repComponentRef.current[uuid] = ref;
		};
	}, []);

	// Memoize page style
	const pageStyle = useMemo(
		() => ({
			width: page.width * SCALE,
			height: page.height * SCALE,
		}),
		[page.width, page.height],
	);

	return (
		<div
			ref={pageRef}
			style={pageStyle}
			className={classes.page}
			onClick={onClick}
			onMouseDown={onMouseDown}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseLeave}
			onKeyDown={onKeyDown}
			tabIndex={-1}
		>
			<PagePaddingPseudo
				paddingRight={page.paddingRight}
				paddingTop={page.paddingTop}
				paddingBottom={page.paddingBottom}
				paddingLeft={page.paddingLeft}
			/>
			{page.components &&
				Object.entries(page.components).map(([key, comp]) => {
					return (
						<RendererReportComponent
							key={key}
							ref={setComponentRef(comp.uuid)}
							scale={SCALE}
							component={comp}
							onComponentActive={activateComponent}
							onSaveCompPosition={onSaveCompPosition}
							onValueChanged={onCompValueChanged}
							restrictBoundary={restrictBoundary}
						/>
					);
				})}
		</div>
	);
}

export default React.memo(ReportPage);
