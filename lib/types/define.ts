import { CSSProperties } from 'react';

import { Field } from './field/field.ts';

export interface FormDefine {
	sections: Section[];
}

export interface Section {
	id: string;
	hide?: boolean;
	hideInPDF: boolean;
	label?: string;
	type: string;
	maxWidth?: string;
	isHeader?: boolean;
	subSections: SubSection[];
	style?: CSSProperties;
}

export interface SubSection {
	id: string;
	maxWidth?: string;
	fields: Field[];
	style?: CSSProperties;
}
