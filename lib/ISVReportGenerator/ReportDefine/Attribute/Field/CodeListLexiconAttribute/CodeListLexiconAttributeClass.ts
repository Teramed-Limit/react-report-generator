import { FormFieldType } from '../../../../../field/field-type.ts';
import { LexiconField } from '../../../../../types/field/lexicon-field.ts';
import { FilterCondition, OptionSource } from '../../../../../types/field/selection-field.ts';
import { BaseAttributeClass } from '../BaseAttribute/BaseAttributeClass.ts';

export class CodeListLexiconAttributeClass extends BaseAttributeClass implements LexiconField {
	optionSource: OptionSource;
	filterCondition: FilterCondition;
	maxLength: number;
	type = FormFieldType.CodeListLexicon;

	constructor(field: LexiconField) {
		super(field);

		this.maxLength = field.maxLength || 1000;
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
