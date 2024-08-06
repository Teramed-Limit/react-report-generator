import { Field } from './field';

export interface DiagramField extends Field {
	hideToolbar: boolean;
	width?: string;
	height?: string;
}
