import { Field } from './field';

export interface OptionSource {
	type: string;
	source: string;
	labelKey: string;
	key: string;
}

export interface FilterCondition {
	// 在formValuesAtom中的id
	filterById: string;
	// 在CodeList中的filter key
	filterOptionKey: string;
}

export interface SelectionField extends Field {
	isMulti?: boolean;
	optionSource: OptionSource;
	filterCondition: FilterCondition;
	joinStr?: string;
}
