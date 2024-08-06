import { Field } from './field';
import { FilterCondition, OptionSource } from './selection-field';

export interface RadioField extends Field {
	optionSource: OptionSource;
	filterCondition: FilterCondition;
}
