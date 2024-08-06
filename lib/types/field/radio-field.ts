import { Field } from './field';
import { FilterCondition, OptionSource } from './selection-field';

export interface RadioField extends Field {
	direction: 'row' | 'column';
	optionSource: OptionSource;
	filterCondition: FilterCondition;
}
