import { FormFieldType } from '../../../../../field/field-type.ts';
import { RadioField } from '../../../../../types/field/radio-field.ts';
import { FilterCondition, OptionSource } from '../../../../../types/field/selection-field.ts';
import { BaseAttributeClass } from '../BaseAttribute/BaseAttributeClass.ts';

export class RadioAttributeClass extends BaseAttributeClass implements RadioField {
	filterCondition: FilterCondition;
	optionSource: OptionSource;
	direction: 'row' | 'column';
	type = FormFieldType.Radio;

	constructor(field: RadioField) {
		super(field);

		this.direction = field.direction || 'row';

		this.optionSource = field.optionSource || {
			type: 'http',
			source: 'ReportTemplate',
			labelKey: 'Label',
			key: 'Value',
		};

		this.filterCondition = field.filterCondition || {
			filterById: '',
			filterOptionKey: '',
		};
	}
}
