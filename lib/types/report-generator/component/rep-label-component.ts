import { RepComponent } from './rep-component';

export interface RepLabelComponent extends RepComponent, Font {
	suffix: string;
	prefix: string;
	value: string;
}

export interface Font {
	fontSize: number;
	fontName: string;
	fontStyle: 'normal' | 'italic' | 'oblique';
	fontColor: string;
	fontWeight: number;
}
