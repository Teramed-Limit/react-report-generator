import { CSSProperties } from 'react';

import { Style } from '@react-pdf/types/style';

import { ArrayField } from './field/array-field.ts';
import { CompositeField } from './field/composite-field.ts';
import { Field } from './field/field.ts';
import { ParagraphField } from './field/paragraph-field.ts';

export interface FormDefine {
	sections: Section[];
}

export interface Section {
	id: string;
	label: string;
	hide: boolean;
	hideInPDF: boolean;
	type: string;
	maxWidth?: string;
	isHeader?: boolean;
	subSections: SubSection[];
	style?: CSSProperties | Style | Style[];
	labelStyle?: CSSProperties | Style | Style[];
	labelDecorationColor?: string;
}

export interface SubSection {
	id: string;
	hide: boolean;
	hideInPDF: boolean;
	maxWidth?: string;
	fields: (Field | ArrayField | CompositeField | ParagraphField)[];
	style?: CSSProperties | Style | Style[];
}
