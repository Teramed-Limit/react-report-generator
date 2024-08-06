import { FormFieldType } from '../../../../../field/field-type.ts';
import { TextareaField } from '../../../../../types/field/textarea-field.ts';
import { BaseAttributeClass } from '../BaseAttribute/BaseAttributeClass.ts';

export class TextAreaAttributeClass extends BaseAttributeClass implements TextareaField {
	rows?: number;
	maxLength?: number;
	placeholder?: string;
	type = FormFieldType.TextArea;

	constructor(field: TextareaField) {
		super(field);

		this.rows = field.rows || 4;
		this.placeholder = field.placeholder || '';
		this.maxLength = field.maxLength || 1000;
	}
}
