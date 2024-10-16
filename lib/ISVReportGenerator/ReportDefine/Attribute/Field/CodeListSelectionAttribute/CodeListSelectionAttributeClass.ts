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
		this.optionSource = {
			type: field?.optionSource.type || 'http',
			source: field?.optionSource.source || 'ReportTemplate',
			labelKey: field?.optionSource.labelKey || 'Label',
			key: field?.optionSource.key || 'Value',
		};
		this.filterCondition = {
			filterById: field?.filterCondition?.filterById || '',
			filterOptionKey: field?.filterCondition?.filterOptionKey || '',
		};
	}
}
