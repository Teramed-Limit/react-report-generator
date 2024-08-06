import { FormFieldType } from '../../../../../field/field-type.ts';
import { DateField } from '../../../../../types/field/date-field.ts';
import { BaseAttributeClass } from '../BaseAttribute/BaseAttributeClass.ts';

export class DatePickerAttributeClass extends BaseAttributeClass implements DateField {
	type = FormFieldType.DatePicker;
	defaultToday?: boolean;
	fromFormat?: string;
	toFormat?: string;
	suffix?: string;
	prefix?: string;

	constructor(field: DateField) {
		super(field);

		this.defaultToday = field.defaultToday || false;
		this.fromFormat = field.fromFormat || '';
		this.toFormat = field.toFormat || '';
		this.suffix = field.suffix || '';
		this.prefix = field.prefix || '';
	}
}
