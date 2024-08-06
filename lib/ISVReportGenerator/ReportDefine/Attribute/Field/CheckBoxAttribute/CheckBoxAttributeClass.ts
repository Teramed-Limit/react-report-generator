import { FormFieldType } from '../../../../../field/field-type.ts';
import { CheckboxField, ValueType } from '../../../../../types/field/checkbox-field';
import { BaseAttributeClass } from '../BaseAttribute/BaseAttributeClass.ts';

export class CheckBoxAttributeClass extends BaseAttributeClass implements CheckboxField {
	checkboxLabel: string;
	type = FormFieldType.Checkbox;
	valueType: ValueType;

	constructor(field: CheckboxField) {
		super(field);
		this.checkboxLabel = field.checkboxLabel || '';
		this.valueType = field.valueType || ValueType.string;
	}
}
