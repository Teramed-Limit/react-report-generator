import { CSSProperties } from 'react';

import { Style } from '@react-pdf/types/style';

import { FormFieldType } from '../../field/field-type.ts';
import { Validate } from '../validate';

export interface Field {
	id: string;
	type: FormFieldType;
	hide?: boolean;
	hideInPDF?: boolean;
	hint?: string;
	orientation: 'column' | 'row';
	validate?: Validate;
	readOnly?: boolean;
	buttonBar?: ButtonMeta[];
	// label
	label?: string;
	hideLabel?: boolean;
	labelWidth: string;
	labelStyle?: CSSProperties | Style | Style[];
	// value
	defaultValue?: string;
	valueStyle?: CSSProperties | Style | Style[];
	// 和哪個Id的欄位做連動
	initMapping?: string;
	valueChangedEvent?: ValueChangedEvent<any>;
}

export interface ValueChangedEvent<T> {
	event: string;
	eventParams: T;
}

export interface ButtonMeta {
	id: string;
	label: string;
	action: string;
	actionParams?: any;
	hide?: boolean;
	disable?: boolean;
}

export interface FieldMetaInfo {
	path: (string | number)[];
	field: Field;
}
