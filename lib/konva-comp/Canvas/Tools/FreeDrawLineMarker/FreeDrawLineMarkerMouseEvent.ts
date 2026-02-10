import Konva from 'konva';

import { CanvasMarker, MarkerType } from '../../../../types/canvas/canvas-maker-attribute.ts';
import { generateUUID } from '../../../../utils/general';
import { getRelativePointerPosition, nullMouseEvent } from '../../canvas-utils';
import { MarkerEvent } from '../../MarkerEvent/MarkerEvent';

const markerType = MarkerType.FreeDraw;

const FreeDrawLineMarkerMouseEvent = (): MarkerEvent => {
	// 用閉包保存繪製狀態
	let drawingId: string | null = null;

	const onMouseDown = (
		e: Konva.KonvaEventObject<MouseEvent>,
		mainColor: string,
		subColor: string,
		canvasMarkers: CanvasMarker<Konva.ShapeConfig>[],
		setCanvasMarkers: (value: CanvasMarker<Konva.ShapeConfig>[]) => void,
	) => {
		const point = getRelativePointerPosition(e.target.getStage());
		drawingId = generateUUID();

		const newMarker: CanvasMarker<Konva.LineConfig> = {
			id: drawingId,
			name: `${markerType}`,
			type: markerType,
			attribute: {
				fill: subColor,
				stroke: mainColor,
				strokeWidth: 10,
				x: point.x,
				y: point.y,
				points: [point.x, point.y],
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
		if (!drawingId) return;

		const point = getRelativePointerPosition(e.target.getStage());

		const updatedMarkers = canvasMarkers.map((marker) => {
			if (marker.id === drawingId) {
				return {
					...marker,
					attribute: {
						...marker.attribute,
						points: [...(marker.attribute.points || []), point.x, point.y],
					},
				};
			}
			return marker;
		});

		setCanvasMarkers(updatedMarkers);
	};

	const onMouseUp = (
		_e: Konva.KonvaEventObject<MouseEvent>,
		_mainColor: string,
		_subColor: string,
		_canvasMarkers: CanvasMarker<Konva.ShapeConfig>[],
		_setCanvasMarkers: (value: CanvasMarker<Konva.ShapeConfig>[]) => void,
	) => {
		// 重置狀態
		drawingId = null;
	};

	return {
		onClick: nullMouseEvent,
		onMouseDown,
		onMouseMove,
		onMouseUp,
	};
};

export default FreeDrawLineMarkerMouseEvent;
