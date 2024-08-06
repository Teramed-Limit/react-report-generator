import { Field } from './field';
import { FilterCondition, OptionSource } from './selection-field';

export interface LexiconField extends Field {
	maxLength: number;
	optionSource: OptionSource;
	filterCondition: FilterCondition;
}

export interface AsyncLexiconField extends Field {
	maxLength: number;
	termId: string;
	optionSource: OptionSource;
}
