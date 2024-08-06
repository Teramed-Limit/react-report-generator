import { FormFieldType } from '../../../../../field/field-type.ts';
import { SRTextField } from '../../../../../types/field/sr-text-field.ts';
import { BaseAttributeClass } from '../BaseAttribute/BaseAttributeClass.ts';

export class SRTextAttributeClass extends BaseAttributeClass implements SRTextField {
	placeholder?: string;
	suffix?: string;
	prefix?: string;
	structureReportPath?: string;
	daysToWeeks?: boolean;
	formula?: string;
	type = FormFieldType.SRText;

	constructor(field: SRTextField) {
		super(field);

		this.suffix = field.suffix || '';
		this.prefix = field.prefix || '';
		this.structureReportPath = field.structureReportPath || '';
		this.daysToWeeks = field.daysToWeeks || false;
		this.formula = field.formula || '';
		this.placeholder = field.placeholder || '';
	}
}
