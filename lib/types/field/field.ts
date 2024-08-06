import { CSSProperties } from 'react';

import { FormFieldType } from '../../field/field-type.ts';
import { Validate } from '../validate';

export interface BaseField {
	id: string;
	label?: string;
	labelWidth: string;
	type: FormFieldType;
	orientation: 'column' | 'row';
	hint?: string;
	hide?: boolean;
	hideLabel?: boolean;
	labelStyle?: CSSProperties;
}

export interface Field extends BaseField {
	// 初始值
	defaultValue?: string;
	// 和哪個Id的欄位做連動
	initMapping?: string;
	readOnly?: boolean;
	suffix?: string;
	prefix?: string;
	buttonBar?: ButtonMeta[];
	validate?: Validate;
	fromModal?: string;
	valueStyle?: CSSProperties;
	valueChangedEvent?: ValueChangedEvent;
}

export interface ValueChangedEvent {
	event: string;
	eventParams: any;
}

export interface ButtonMeta {
	id: string;
	label: string;
	action: string;
	actionParams?: any;
	hide?: boolean;
	disable?: boolean;
}
