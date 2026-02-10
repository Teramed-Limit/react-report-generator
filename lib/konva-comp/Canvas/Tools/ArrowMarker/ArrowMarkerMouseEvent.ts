import Konva from 'konva';

import { CanvasMarker, MarkerType } from '../../../../types/canvas/canvas-maker-attribute.ts';
import { generateUUID } from '../../../../utils/general';
import { getRelativePointerPosition, nullMouseEvent } from '../../canvas-utils';
import { MarkerEvent } from '../../MarkerEvent/MarkerEvent';

const markerType = MarkerType.Arrow;

const ArrowMarkerMouseEvent = (): MarkerEvent => {
	// 用閉包保存繪製狀態
	let startPoint: Konva.Vector2d | null = null;
	let drawingId: string | null = null;

	const onMouseDown = (
		e: Konva.KonvaEventObject<MouseEvent>,
		mainColor: string,
		subColor: string,
		canvasMarkers: CanvasMarker<Konva.ShapeConfig>[],
		setCanvasMarkers: (value: CanvasMarker<Konva.ShapeConfig>[]) => void,
	) => {
		startPoint = getRelativePointerPosition(e.target.getStage());
		drawingId = generateUUID();

		const newMarker: CanvasMarker<Konva.ShapeConfig> = {
			id: drawingId,
			name: `${markerType}`,
			type: markerType,
			attribute: {
				fill: subColor,
				stroke: mainColor,
				strokeWidth: 4,
				x: startPoint.x,
				y: startPoint.y,
				points: [0, 0, 0, 0],
				pointerLength: 20,
				pointerWidth: 20,
				rotation: 0,
				scaleX: 1,
				scaleY: 1,
				dashEnabled: false,
			},
		};

		setCanvasMarkers([...canvasMarkers, newMarker]);
	};

	const onMouseMove = (
		e: Konva.KonvaEventObject<MouseEvent>,
		_mainColor: string,
		_subColor: string,
		canvasMarkers: CanvasMarker<Konva.ShapeConfig>[],
		setCanvasMarkers: (value: CanvasMarker<Konva.ShapeConfig>[]) => void,
	) => {
		if (!startPoint || !drawingId) return;

		const movePoint = getRelativePointerPosition(e.target.getStage());

		const updatedMarkers = canvasMarkers.map((marker) => {
			if (marker.id === drawingId) {
				return {
					...marker,
					attribute: {
						...marker.attribute,
						points: [0, 0, movePoint.x - startPoint!.x, movePoint.y - startPoint!.y],
					},
				};
			}
			return marker;
		});

		setCanvasMarkers(updatedMarkers);
	};

	const onMouseUp = (
		e: Konva.KonvaEventObject<MouseEvent>,
		_mainColor: string,
		_subColor: string,
		canvasMarkers: CanvasMarker<Konva.ShapeConfig>[],
		setCanvasMarkers: (value: CanvasMarker<Konva.ShapeConfig>[]) => void,
	) => {
		if (!startPoint || !drawingId) return;

		const lastPoint = getRelativePointerPosition(e.target.getStage());

		// 如果太小就刪除
		if (Math.abs(startPoint.x - lastPoint.x) < 5 && Math.abs(startPoint.y - lastPoint.y) < 5) {
			setCanvasMarkers(canvasMarkers.filter((m) => m.id !== drawingId));
		}

		// 重置狀態
		startPoint = null;
		drawingId = null;
	};

	return {
		onClick: nullMouseEvent,
		onMouseDown,
		onMouseMove,
		onMouseUp,
	};
};

export default ArrowMarkerMouseEvent;
