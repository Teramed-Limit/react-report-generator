import Konva from 'konva';

import { CanvasMarker } from '../../../types/canvas/canvas-maker-attribute.ts';

export interface MarkerEvent {
	onClick: (
		e: Konva.KonvaEventObject<MouseEvent>,
		mainColor: string,
		subColor: string,
		canvasMarkers: CanvasMarker<Konva.ShapeConfig>[],
		setCanvasMarkers: (value: CanvasMarker<Konva.ShapeConfig>[]) => void,
		setSelectMarkerId: (value: string) => void,
	) => void;
	onMouseDown: (
		e: Konva.KonvaEventObject<MouseEvent>,
		mainColor: string,
		subColor: string,
		canvasMarkers: CanvasMarker<Konva.ShapeConfig>[],
		setCanvasMarkers: (value: CanvasMarker<Konva.ShapeConfig>[]) => void,
		setSelectMarkerId: (value: string) => void,
	) => void;
	onMouseMove: (
		e: Konva.KonvaEventObject<MouseEvent>,
		mainColor: string,
		subColor: string,
		canvasMarkers: CanvasMarker<Konva.ShapeConfig>[],
		setCanvasMarkers: (value: CanvasMarker<Konva.ShapeConfig>[]) => void,
		setSelectMarkerId: (value: string) => void,
	) => void;
	onMouseUp: (
		e: Konva.KonvaEventObject<MouseEvent>,
		mainColor: string,
		subColor: string,
		canvasMarkers: CanvasMarker<Konva.ShapeConfig>[],
		setCanvasMarkers: (value: CanvasMarker<Konva.ShapeConfig>[]) => void,
		setSelectMarkerId: (value: string) => void,
	) => void;
}
