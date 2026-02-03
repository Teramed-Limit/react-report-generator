import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { RepComponent } from '../../../types/report-generator/component/rep-component';
import { Point } from '../../../types/report-generator/rep-report.ts';

import { ReportComponentMapper } from './report-component-mapper';

interface Props {
	component: RepComponent;
	scale: number;
	onComponentActive: (comp: RepComponent, deactivateOthers: boolean) => void;
	restrictBoundary: (oriPoint: Point, movePoint: Point, targetRect: DOMRect) => Point;
	onSaveCompPosition: () => void;
	onValueChanged: (uuid: string, attrPath: (string | number)[], value: string) => void;
}

type RepComponentHandle = {
	moveCompPosition: (point: Point) => void;
	getCompPosition: () => Point;
	activeComp: () => void;
	deactivateComp: () => void;
	movable: () => boolean;
};

// 空函數提取到組件外部，避免每次渲染重建
const noop = () => {};

const RendererReportComponent = React.forwardRef<RepComponentHandle, Props>(
	({ component, scale, onValueChanged, onComponentActive, restrictBoundary, onSaveCompPosition }: Props, ref) => {
		const [position, setPosition] = useState({ x: component.x, y: component.y });
		const [isActive, setIsActive] = useState(false);
		const componentRef = useRef<Element>();
		const movable = useRef<boolean>(false);

		// 更新元件位置
		useEffect(() => {
			setPosition({ x: component.x, y: component.y });
		}, [component.x, component.y]);

		useImperativeHandle(ref, () => {
			return {
				moveCompPosition(movement: Point) {
					setPosition((p) => {
						if (!componentRef.current) return p;
						const point = restrictBoundary(p, movement, componentRef.current?.getBoundingClientRect());
						return { x: point.x, y: point.y };
					});
				},
				getCompPosition() {
					return { x: position.x * scale, y: position.y * scale };
				},
				activeComp() {
					setIsActive(true);
				},
				deactivateComp() {
					setIsActive(false);
				},
				movable() {
					return movable.current;
				},
			};
		});

		const onMouseDown = useCallback(
			(e: React.MouseEvent) => {
				movable.current = true;
				if (isActive) return;
				setIsActive(true);
				onComponentActive(component, !e.shiftKey);
			},
			[isActive, component, onComponentActive],
		);

		const onMouseUp = useCallback(() => {
			movable.current = false;
			onSaveCompPosition();
		}, [onSaveCompPosition]);

		// Memoize style object
		const componentStyle = useMemo(
			() => ({
				position: 'absolute' as const,
				top: position.y * scale,
				left: position.x * scale,
				boxShadow: `inset 0 0 0 2px ${isActive ? 'red' : 'black'}`,
				zIndex: isActive ? 999 : 'unset',
				boxSizing: 'content-box' as const,
			}),
			[position.x, position.y, scale, isActive],
		);

		const RenderComponent = ReportComponentMapper[component.componentType];
		if (!RenderComponent) return <></>;

		return (
			<RenderComponent
				ref={componentRef}
				style={componentStyle}
				scale={scale}
				component={component}
				onClick={noop}
				onMouseDown={onMouseDown}
				onMouseUp={onMouseUp}
				onMouseMove={noop}
				onMouseEnter={noop}
				onMouseLeave={noop}
				onActive={onComponentActive}
				onValueChanged={onValueChanged}
			/>
		);
	},
);

RendererReportComponent.displayName = 'RendererReportComponent';
export default React.memo(RendererReportComponent);
