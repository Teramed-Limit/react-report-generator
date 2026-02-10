import { ShapeConfig } from 'konva/lib/Shape';

export enum MarkerType {
	None = 'None',
	Text = 'Text',
	Circle = 'Circle',
	Square = 'Square',
	Arrow = 'Arrow',
	FreeDraw = 'FreeDraw',
}

export interface CanvasMarker<T extends ShapeConfig> {
	id: string;
	type: MarkerType;
	name: string;
	attribute: T;
}

export interface PositionMarker<T = unknown> {
	mappingNumber: number;
	pointX: number;
	pointY: number;
	data: T;
}
