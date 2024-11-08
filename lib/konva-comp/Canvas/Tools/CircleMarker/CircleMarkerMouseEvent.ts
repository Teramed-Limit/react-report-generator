import Konva from 'konva';

import { CanvasMarker, MarkerType } from '../../../../types/canvas/canvas-maker-attribute.ts';
import { generateUUID } from '../../../../utils/general';
import { getRelativePointerPosition, nullMouseEvent } from '../../canvas-utils';
import { MarkerEvent } from '../../MarkerEvent/MarkerEvent';

const markerType = MarkerType.Circle;

const CircleMarkerMouseEvent = (): MarkerEvent => {
	const onClick = (
		e: Konva.KonvaEventObject<MouseEvent>,
		mainColor: string,
		subColor: string,
		canvasMarkers: CanvasMarker<Konva.ShapeConfig>[],
		setCanvasMarkers: (value: CanvasMarker<Konva.ShapeConfig>[]) => void,
	) => {
		e.cancelBubble = true;
		const point = getRelativePointerPosition(e.target.getStage());
		const uuid = generateUUID();
		const newMarker: CanvasMarker<Konva.CircleConfig> = {
			id: uuid,
			name: `${markerType}`,
			type: markerType,
			attribute: {
				fill: subColor,
				stroke: mainColor,
				strokeWidth: 10,
				x: point.x,
				y: point.y,
				radius: 50,
				rotation: 0,
				scaleX: 1,
				scaleY: 1,
			},
		};

		setCanvasMarkers(canvasMarkers.concat([newMarker]));
	};

	return {
		onClick,
		onMouseDown: nullMouseEvent,
		onMouseMove: nullMouseEvent,
		onMouseUp: nullMouseEvent,
	};
};

export default CircleMarkerMouseEvent;
