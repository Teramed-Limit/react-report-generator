import { MarkerEvent } from '../konva-comp/Canvas/MarkerEvent/MarkerEvent.ts';
import ArrowMarkerMouseEvent from '../konva-comp/Canvas/Tools/ArrowMarker/ArrowMarkerMouseEvent.ts';
import CircleMarkerMouseEvent from '../konva-comp/Canvas/Tools/CircleMarker/CircleMarkerMouseEvent.ts';
import FreeDrawLineMarkerMouseEvent from '../konva-comp/Canvas/Tools/FreeDrawLineMarker/FreeDrawLineMarkerMouseEvent.ts';
import NoneMouseEvent from '../konva-comp/Canvas/Tools/NoneMouseEvent.ts';
import SquareMarkerMouseEvent from '../konva-comp/Canvas/Tools/SquareMarker/SquareMarkerMouseEvent.ts';
import TextMarkerMouseEvent from '../konva-comp/Canvas/Tools/TextMarker/TextMarkerMouseEvent.ts';
import { MarkerType } from '../types/canvas/canvas-maker-attribute.ts';

const ToolMouseEventMapper = {
	[MarkerType.None]: NoneMouseEvent,
	[MarkerType.Text]: TextMarkerMouseEvent,
	[MarkerType.Circle]: CircleMarkerMouseEvent,
	[MarkerType.Square]: SquareMarkerMouseEvent,
	[MarkerType.Arrow]: ArrowMarkerMouseEvent,
	[MarkerType.FreeDraw]: FreeDrawLineMarkerMouseEvent,
};

export function useCanvasTool(markerType: MarkerType = MarkerType.None) {
	const event = ToolMouseEventMapper[markerType]() as MarkerEvent;

	return {
		onClick: event.onClick,
		onMouseDown: event.onMouseDown,
		onMouseMove: event.onMouseMove,
		onMouseUp: event.onMouseUp,
	};
}
