import React, { useRef, useState } from 'react';

import * as R from 'ramda';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { useRepComponentTool } from '../../../hooks/useRepComponentTool.ts';
import {
	activeCompAttributeAtom,
	activePageAtom,
	activePageAttributeAtom,
	activeUidAtom,
	createRepCompTypeAtom,
} from '../../../recoil/atoms/header-footer-defineAtom.ts';
import { RepComponent, ReportComponentType } from '../../../types/report-generator/component/rep-component.ts';
import { RepPage } from '../../../types/report-generator/rep-page.ts';
import { Point } from '../../../types/report-generator/rep-report.ts';
import { generateUUID } from '../../../utils/general.ts';
import RendererReportComponent from '../Components/RendererReportComponent';
import PagePaddingPseudo from './PagePaddingPseudo/PagePaddingPseudo'; // const PaperSizeMapper = {
import classes from './ReportPage.module.scss';

interface Props {
	page: RepPage;
}

type RepComponentHandle = React.ElementRef<typeof RendererReportComponent>;
const GRID_SIZE = 10; // 定義網格大小
const HALF_GRID_SIZE = GRID_SIZE; // 定義網格大小的一半

const cumulativeMoveX = 0; // 累計 X 方向的移動量
const cumulativeMoveY = 0; // 累計 Y 方向的移動量

function ReportPage({ page }: Props) {
	const setActivePage = useSetRecoilState(activePageAtom);
	const setActivePageAttribute = useSetRecoilState(activePageAttributeAtom);
	const [createRepCompType, setCreateRepCompType] = useRecoilState(createRepCompTypeAtom);
	const setActiveCompUUid = useSetRecoilState(activeUidAtom);
	const [activeCompAttribute, setActiveCompAttribute] = useRecoilState(activeCompAttributeAtom);

	// 使用 useRef 建立 ref 變數，用於獲取並操作 DOM 元素
	const pageRef = useRef<HTMLDivElement | null>(null);

	// 用於縮放頁面，映射到PDF是寬度是595px，但實際上在網頁寬度是794px(210mm)
	const [scale] = useState(1.33445378);
	// const [scale] = useState(1);

	// 正在使用的元件

	const { onGenerate } = useRepComponentTool(createRepCompType);

	// 移動狀態
	const isMoving = useRef(false);
	const startMove = useRef(false);

	// 定義元件的 ref 和狀態
	const repComponentRef = useRef<Record<string, RepComponentHandle>>({});
	const activeComponentRef = useRef<Record<string, RepComponent>>({});
	const copyComponentRef = useRef<Record<string, RepComponent>>({});

	// 確定元素在頁面上的位置是否超出邊界
	// const restrictBoundary = (oriPoint: Point, movePoint: Point, targetRect: DOMRect): Point => {
	// 	// 累積移動量
	// 	cumulativeMoveX += movePoint.x / scale;
	// 	cumulativeMoveY += movePoint.y / scale;
	//
	// 	// 如果移動量超過一半的網格大小，則對齊到網格
	// 	let snappedMoveX = 0;
	// 	let snappedMoveY = 0;
	//
	// 	if (Math.abs(cumulativeMoveX) >= HALF_GRID_SIZE) {
	// 		snappedMoveX = (cumulativeMoveX > 0 ? 1 : -1) * GRID_SIZE;
	// 		cumulativeMoveX = 0;
	// 	}
	//
	// 	if (Math.abs(cumulativeMoveY) >= HALF_GRID_SIZE) {
	// 		snappedMoveY = (cumulativeMoveY > 0 ? 1 : -1) * GRID_SIZE;
	// 		cumulativeMoveY = 0;
	// 	}
	//
	// 	// 計算移動後的位置
	// 	const destPoint = {
	// 		x: oriPoint.x + snappedMoveX,
	// 		y: oriPoint.y + snappedMoveY,
	// 	};
	//
	// 	if (destPoint.x < 0) destPoint.x = 0;
	// 	if (destPoint.y < 0) destPoint.y = 0;
	//
	// 	// if (destPoint.x % GRID_SIZE !== 0) {
	// 	// 	if (destPoint.x / GRID_SIZE < 1) {
	// 	// 		destPoint.x = GRID_SIZE;
	// 	// 	} else {
	// 	// 		const remainder = Math.floor(destPoint.x / GRID_SIZE);
	// 	// 		destPoint.x = remainder * GRID_SIZE;
	// 	// 	}
	// 	// }
	// 	//
	// 	// if (destPoint.y % GRID_SIZE !== 0) {
	// 	// 	if (destPoint.y / GRID_SIZE < 1) {
	// 	// 		destPoint.y = GRID_SIZE;
	// 	// 	} else {
	// 	// 		const remainder = Math.floor(destPoint.y / GRID_SIZE);
	// 	// 		destPoint.y = remainder * GRID_SIZE;
	// 	// 	}
	// 	// }
	//
	// 	// 限制移動範圍
	// 	if (destPoint.x <= page.paddingLeft / scale) {
	// 		destPoint.x = page.paddingLeft / scale;
	// 	}
	//
	// 	if (destPoint.y <= page.paddingTop / scale) {
	// 		destPoint.y = page.paddingTop / scale;
	// 	}
	//
	// 	if (destPoint.x >= page.width - targetRect.width / scale - page.paddingRight / scale) {
	// 		destPoint.x = page.width - targetRect.width / scale - page.paddingRight / scale;
	// 	}
	//
	// 	if (destPoint.y > page.height - targetRect.height / scale - page.paddingBottom / 2) {
	// 		destPoint.y = page.height - targetRect.height / scale - page.paddingBottom / 2;
	// 	}
	//
	// 	return {
	// 		x: Math.round(destPoint.x),
	// 		y: Math.round(destPoint.y),
	// 	};
	// };

	const restrictBoundary = (oriPoint: Point, movePoint: Point, targetRect: DOMRect): Point => {
		const destPoint = {
			x: oriPoint.x + movePoint.x / scale,
			y: oriPoint.y + movePoint.y / scale,
		};

		if (destPoint.x < 0) destPoint.x = 0;
		if (destPoint.y < 0) destPoint.y = 0;

		if (destPoint.x <= page.paddingLeft / scale) destPoint.x = page.paddingLeft / scale;
		if (destPoint.y <= page.paddingTop / scale) destPoint.y = page.paddingTop / scale;

		if (destPoint.x >= page.width - targetRect.width / scale - page.paddingRight / scale)
			destPoint.x = page.width - targetRect.width / scale - page.paddingRight / scale;

		if (destPoint.y > page.height - targetRect.height / scale - page.paddingBottom / 2)
			destPoint.y = page.height - targetRect.height / scale - page.paddingBottom / 2;

		return destPoint;
	};

	// 計算滑鼠在實際頁面上的位置
	const calculateMouseToPageActuallyPos = (e: React.MouseEvent): Point => {
		if (!pageRef.current) return { x: 0, y: 0 };
		const boundingClientRect = pageRef.current?.getBoundingClientRect();
		const x = e.pageX - boundingClientRect.x;
		const y = e.pageY - boundingClientRect.y;
		return { x: x / scale, y: y / scale };
	};

	const onSaveCompPosition = () => {
		setActivePageAttribute((prev) => {
			// 淺拷貝
			let newPage = { ...prev };

			Object.keys(activeComponentRef.current)?.forEach((uuid) => {
				if (!repComponentRef.current[uuid]) return;

				// 獲取指定組件的位置
				const pos = repComponentRef.current[uuid].getCompPosition();

				// 獲取新頁面物件中的指定組件
				const comp = newPage.components[uuid];

				// 更新新頁面物件中的指定組件
				newPage = {
					...newPage,
					components: R.assocPath(
						[uuid],
						{ ...comp, x: pos.x / scale, y: pos.y / scale },
						newPage.components,
					),
				};
			});

			// 回傳更新後的新頁面物件
			return newPage;
		});
	};

	// 標記所有元件停止動作
	const deactivateAllComponent = () => {
		// deactivate other comp
		activeComponentRef.current = {};
		Object.keys(repComponentRef.current)?.forEach((uuid) => {
			repComponentRef.current[uuid].deactivateComp();
		});
	};

	// Active選中的原件，和是否停用所有元件
	const activateComponent = (comp: RepComponent, deactivateOthers: boolean) => {
		if (deactivateOthers) deactivateAllComponent();
		activeComponentRef.current[comp.uuid] = comp;
		Object.keys(repComponentRef.current).forEach((uuid) => {
			if (comp.uuid === uuid) {
				repComponentRef.current[uuid].activeComp();
			}
		});
	};

	const onMouseDown = (e: React.MouseEvent) => {
		const remainActiveComp = Object.values(activeComponentRef.current)[0];
		// 標記移動中止
		isMoving.current = false;
		// 宣告Active的Page
		setActivePage(page.name);
		// 宣告Active的元件
		if (remainActiveComp) {
			setActiveCompUUid(remainActiveComp.uuid);
		}
		// 只要屬標在其中一個Active的元件上，就標記可以移動
		startMove.current = Object.keys(activeComponentRef.current)?.some((uuid) => {
			return repComponentRef.current[uuid].movable();
		});
	};

	const onMouseMove = (e: React.MouseEvent) => {
		// 移動標記檢查
		if (!startMove.current) return;

		// 標記正在移動中
		isMoving.current = true;
		// 元件位移增減通知
		Object.keys(activeComponentRef.current)?.forEach((uuid) => {
			repComponentRef.current[uuid].moveCompPosition({
				x: e.movementX,
				y: e.movementY,
			});
		});
	};

	const onMouseUp = (e: React.MouseEvent) => {
		// 標記移動中不插入元件至報告中
		if (!isMoving.current) {
			// 新增元件到Page上
			const addedComp = onGenerate(e, calculateMouseToPageActuallyPos(e));
			if (addedComp) {
				// deactivate others
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

		// 儲存元件位置
		Object.keys(activeComponentRef.current)?.forEach((uuid) => {
			if (!repComponentRef.current[uuid]) return;
			// 獲取指定組件的位置
			const pos = repComponentRef.current[uuid].getCompPosition();
			activeComponentRef.current[uuid] = {
				...activeComponentRef.current[uuid],
				x: pos.x,
				y: pos.y,
			};
		});
	};

	const onMouseLeave = (e: React.MouseEvent) => {
		isMoving.current = false;
		startMove.current = false;
		onSaveCompPosition();
	};

	const onClick = (e: React.MouseEvent) => {
		setActivePage(page.name);
	};

	const handleCopy = () => {
		copyComponentRef.current = activeComponentRef.current;
	};

	const handlePaste = () => {
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
	};

	const handleMovement = (movement: { x: number; y: number }) => {
		Object.keys(activeComponentRef.current)?.forEach((uuid) => {
			repComponentRef.current[uuid].moveCompPosition(movement);
		});
	};

	const handleDelete = () => {
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
	};

	const onKeyDown = (e: React.KeyboardEvent) => {
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
	};

	const onCompValueChanged = (uuid: string, attrPath: (number | string)[], attrValue: number | string | boolean) => {
		if (!activeCompAttribute) return;
		const newValue = R.assocPath([...attrPath], attrValue, activeCompAttribute);
		setActiveCompAttribute(newValue);
	};

	return (
		<div
			ref={pageRef}
			style={{
				width: page.width * scale,
				height: page.height * scale,
			}}
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
				Object.entries(page.components).map(([uuid, comp]) => {
					return (
						<RendererReportComponent
							key={uuid}
							ref={(ref) => {
								if (!ref) return;
								repComponentRef.current[comp.uuid] = ref as RepComponentHandle;
							}}
							scale={scale}
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
