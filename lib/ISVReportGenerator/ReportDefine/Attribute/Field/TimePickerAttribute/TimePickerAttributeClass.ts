import { FormFieldType } from '../../../../../field/field-type.ts';
import { TimeField } from '../../../../../types/field/time-field.ts';
import { BaseAttributeClass } from '../BaseAttribute/BaseAttributeClass.ts';

export class TimePickerAttributeClass extends BaseAttributeClass implements TimeField {
	type = FormFieldType.TimePicker;
	defaultNow?: boolean;

	constructor(field: TimeField) {
		super(field);
		this.defaultNow = field.defaultNow || false;
	}
}
