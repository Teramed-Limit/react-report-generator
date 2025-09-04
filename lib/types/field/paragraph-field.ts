import { CSSProperties } from 'react';

import { Style } from '@react-pdf/types';

import { FormFieldType } from '../../field/field-type';
import { Validate } from '../validate';
import { ValueChangedEvent } from './field';

export interface ParagraphField {
	id: string;
	type: FormFieldType;
	labelStyle: CSSProperties | Style | Style[];
	text: string;
	fields: ParagraphInnerField[];
	hide: boolean;
	hideInPDF: boolean;
	readOnly?: boolean;
}

export interface ParagraphInnerField {
	id: string;
	type: FormFieldType;
	maxWidth: string;
	// 初始值
	defaultValue?: string;
	readOnly?: boolean;
	suffix?: string;
	prefix?: string;
	validate?: Validate;
	valueStyle?: CSSProperties | Style | Style[];
	// 和哪個Id的欄位做連動
	initMapping?: string;
	valueChangedEvent?: ValueChangedEvent<any>;
}
