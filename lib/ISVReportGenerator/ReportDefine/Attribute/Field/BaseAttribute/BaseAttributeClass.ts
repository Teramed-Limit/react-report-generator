import { Style } from '@react-pdf/types/style';

import { FormFieldType } from '../../../../../field/field-type.ts';
import { ButtonMeta, Field } from '../../../../../types/field/field.ts';
import { Validate, ValidateType } from '../../../../../types/validate.ts';
import { CSSStyle } from '../../Common/Complex/ReportCSSStyleAttribute/CSSStyle';

export class BaseAttributeClass implements Field {
	// BaseField
	id: string;
	type: FormFieldType;
	hide: boolean;
	hideInPDF: boolean;
	// Field
	label: string;
	labelWidth: string;
	labelStyle: Style;
	valueStyle: Style;
	defaultValue: string;
	initMapping: string;
	orientation: 'column' | 'row';
	readOnly: boolean;
	buttonBar: ButtonMeta[];
	validate: Validate;
	hint: string;
	hideLabel: boolean;

	constructor(field: Field) {
		this.id = field.id || `Field-${new Date().getTime()}`;
		this.label = field.label || '';
		this.hide = field.hide || false;
		this.hideInPDF = field.hideInPDF || false;
		this.labelWidth = field.labelWidth || '35%';
		this.initMapping = field.initMapping || '';
		this.defaultValue = field.defaultValue || '';
		this.type = field.type || FormFieldType.Text;
		this.readOnly = field?.readOnly || false;
		this.orientation = field.orientation || 'row';
		this.buttonBar = field?.buttonBar || [];
		this.validate = field.validate || { type: ValidateType.None };
		this.hint = field?.hint || '';
		this.hideLabel = field?.hideLabel || false;
		this.labelStyle = (field?.labelStyle as Style) || new CSSStyle();
		this.valueStyle = (field?.valueStyle as Style) || new CSSStyle();
	}
}
