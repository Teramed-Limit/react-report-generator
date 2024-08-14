import { Style } from '@react-pdf/types/style';

import { FormFieldType } from '../../../../../../field/field-type.ts';
import { CompositeInnerField } from '../../../../../../types/field/composite-inner-field.ts';
import { ButtonMeta } from '../../../../../../types/field/field.ts';
import { Validate, ValidateType } from '../../../../../../types/validate.ts';
import { CSSStyle } from '../../../Common/Complex/ReportCSSStyleAttribute/CSSStyle.ts';

export class CompositeInnerFieldAttributeClass implements CompositeInnerField {
	id: string;
	labelWidth: string;
	type: FormFieldType;
	readOnly: boolean;
	initMapping?: string;
	validate?: Validate;
	orientation: 'column' | 'row';
	valueStyle: Style;
	buttonBar?: ButtonMeta[];

	constructor(field: CompositeInnerField) {
		this.id = field.id || `InnerField-${new Date().getTime()}`;
		this.type = field.type;
		this.labelWidth = '0%';
		this.readOnly = field.readOnly || false;
		this.initMapping = field.initMapping || '';
		this.validate = field.validate || { type: ValidateType.None };
		this.orientation = field.orientation || 'row';
		this.valueStyle = field.valueStyle || new CSSStyle();
		this.buttonBar = field.buttonBar || [];
	}
}
