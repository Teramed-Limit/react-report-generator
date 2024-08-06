import { FilterCondition } from '../../../../../../types/field/selection-field.ts';

export class FilterConditionAttribute implements FilterCondition {
	filterById: string;
	filterOptionKey: string;

	constructor(value: FilterCondition) {
		this.filterById = value.filterById || '';
		this.filterOptionKey = value.filterOptionKey || '';
	}
}
