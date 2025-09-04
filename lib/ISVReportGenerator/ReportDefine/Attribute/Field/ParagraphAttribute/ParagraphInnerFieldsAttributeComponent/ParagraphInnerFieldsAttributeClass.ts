import { Style } from '@react-pdf/types/style';
import { CSSProperties } from 'react';

import { FormFieldType } from '../../../../../../field/field-type';
import { ValueChangedEvent } from '../../../../../../types';
import { ParagraphInnerField } from '../../../../../../types/field/paragraph-field';
import { Validate, ValidateType } from '../../../../../../types/validate';
import { CSSStyle } from '../../../Common/Complex/ReportCSSStyleAttribute/CSSStyle';

export class ParagraphInnerFieldsAttributeClass implements ParagraphInnerField {
	id: string;
	type: FormFieldType;
	maxWidth: string;
	defaultValue?: string;
	initMapping?: string;
	readOnly?: boolean;
	suffix?: string;
	prefix?: string;
	validate?: Validate;
	valueStyle?: CSSProperties | Style | Style[];
	valueChangedEvent?: ValueChangedEvent<any>;

	constructor(field: ParagraphInnerField) {
		this.id = field.id || `Field-${new Date().getTime()}`;
		this.type = field.type || FormFieldType.Text;
		this.maxWidth = field.maxWidth || '100%';
		this.defaultValue = field.defaultValue || '';
		this.initMapping = field.initMapping || '';
		this.readOnly = field.readOnly || false;
		this.suffix = field.suffix || '';
		this.prefix = field.prefix || '';
		this.validate = field.validate || { type: ValidateType.None };
		this.valueStyle = (field?.valueStyle as Style) || new CSSStyle();
		this.valueChangedEvent = field.valueChangedEvent || undefined;
	}
}
