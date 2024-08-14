import { CSSProperties } from 'react';

import { Style } from '@react-pdf/types/style';

import { FormFieldType } from '../../field/field-type.ts';
import { CompositeInnerFieldAttributeClass } from '../../ISVReportGenerator/ReportDefine/Attribute/Field/CompositeAttribute/CompositeInnerFieldAttribute/CompositeInnerFieldAttributeClass.ts';

export interface CompositeField {
	id: string;
	type: FormFieldType;
	hide?: boolean;
	hideInPDF?: boolean;
	hint?: string;
	orientation: 'column' | 'row';
	// label
	label?: string;
	hideLabel?: boolean;
	labelWidth: string;
	labelStyle?: CSSProperties | Style | Style[];
	// composite
	compositeOrientation: 'column' | 'row';
	flexDistribution: number[];
	joinStr: string;
	fields: CompositeInnerFieldAttributeClass[];
}
