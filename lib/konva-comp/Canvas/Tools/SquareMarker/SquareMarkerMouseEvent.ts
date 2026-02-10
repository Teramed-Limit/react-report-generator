import Konva from 'konva';

import { CanvasMarker, MarkerType } from '../../../../types/canvas/canvas-maker-attribute.ts';
import { generateUUID } from '../../../../utils/general';
import { getRelativePointerPosition, nullMouseEvent, reverse } from '../../canvas-utils';
import { MarkerEvent } from '../../MarkerEvent/MarkerEvent';

const markerType = MarkerType.Square;

const SquareMarkerMouseEvent = (): MarkerEvent => {
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

		const newMarker: CanvasMarker<Konva.RectConfig> = {
			id: drawingId,
			name: `${markerType}`,
			type: markerType,
			attribute: {
				fill: subColor,
				stroke: mainColor,
				strokeWidth: 10,
				x: startPoint.x,
				y: startPoint.y,
				width: 0,
				height: 0,
				rotation: 0,
				scaleX: 1,
				scaleY: 1,
			},
		};

		setCanvasMarkers([...canvasMarkers, newMarker]);
	};

	const onMouseMove = (
		e: Konva.KonvaEventObject<MouseEvent>,
		mainColor: string,
		subColor: string,
		canvasMarkers: CanvasMarker<Konva.ShapeConfig>[],
		setCanvasMarkers: (value: CanvasMarker<Konva.ShapeConfig>[]) => void,
	) => {
		if (!startPoint || !drawingId) return;

		const movePoint = getRelativePointerPosition(e.target.getStage());
		const posRect = reverse(startPoint, movePoint);

		const updatedMarkers = canvasMarkers.map((marker) => {
			if (marker.id === drawingId) {
				return {
					...marker,
					attribute: {
						...marker.attribute,
						x: posRect.x1,
						y: posRect.y1,
						width: Math.floor(posRect.x2 - posRect.x1),
						height: Math.floor(posRect.y2 - posRect.y1),
					},
				};
			}
			return marker;
		});

		setCanvasMarkers(updatedMarkers);
	};

	const onMouseUp = (
		e: Konva.KonvaEventObject<MouseEvent>,
		mainColor: string,
		subColor: string,
		canvasMarkers: CanvasMarker<Konva.ShapeConfig>[],
		setCanvasMarkers: (value: CanvasMarker<Konva.ShapeConfig>[]) => void,
	) => {
		if (!drawingId) return;

		const drawingMarker = canvasMarkers.find((m) => m.id === drawingId);

		// 如果太小就刪除
		if (!drawingMarker?.attribute.width || drawingMarker.attribute.width < 20) {
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

export default SquareMarkerMouseEvent;
