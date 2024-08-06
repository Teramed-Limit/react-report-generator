import { FormFieldType } from '../../../../../field/field-type.ts';
import { TextField } from '../../../../../types/field/text-field.ts';
import { BaseAttributeClass } from '../BaseAttribute/BaseAttributeClass.ts';

export class NumberAttributeClass extends BaseAttributeClass implements TextField {
	placeholder?: string;
	suffix?: string;
	prefix?: string;
	type = FormFieldType.Number;

	constructor(field: TextField) {
		super(field);

		this.suffix = field.suffix || '';
		this.prefix = field.prefix || '';
		this.placeholder = field.placeholder || '';
	}
}
