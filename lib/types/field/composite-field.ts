import { CSSProperties } from 'react';

import { Style } from '@react-pdf/types/style';

import { FormFieldType } from '../../field/field-type.ts';
import { Validate } from '../validate.ts';
import { ButtonMeta, Field } from './field.ts';

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
	fields: InnerCompositeField[];
}

export interface InnerCompositeField extends Field {
	readOnly: boolean;
	initMapping?: string;
	validate?: Validate;
	valueStyle: Style;
	buttonBar?: ButtonMeta[];
}
