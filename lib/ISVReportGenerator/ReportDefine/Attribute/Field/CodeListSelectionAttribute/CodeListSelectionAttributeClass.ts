import { FormFieldType } from '../../../../../field/field-type.ts';
import { FilterCondition, OptionSource, SelectionField } from '../../../../../types/field/selection-field.ts';
import { BaseAttributeClass } from '../BaseAttribute/BaseAttributeClass.ts';

export class CodeListSelectionAttributeClass extends BaseAttributeClass implements SelectionField {
	isMulti?: boolean;
	optionSource: OptionSource;
	filterCondition: FilterCondition;
	type = FormFieldType.CodeListSelection;
	joinStr?: string;
	fetchLatest?: boolean;

	constructor(field: SelectionField) {
		super(field);

		this.isMulti = field.isMulti || false;
		this.joinStr = field.joinStr || ',';
		// this.fetchLatest = /* field.fetchLatest || */ false;

		this.optionSource = field?.optionSource || {
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
