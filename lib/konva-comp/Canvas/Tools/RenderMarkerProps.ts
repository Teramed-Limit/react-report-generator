import Konva from 'konva';

export interface RenderMarkerProps<T extends Konva.ShapeConfig> {
	id: string;
	attribute: T;
	isSelected: boolean;
	onSelect: (id: string) => void;
	onUpdateAttr: (id: string, attr: Konva.ShapeConfig) => void;
}
