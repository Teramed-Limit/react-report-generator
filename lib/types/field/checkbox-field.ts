import { Field } from './field';

export interface CheckboxField extends Field {
	checkboxLabel: string;
	valueType: ValueType;
}

export enum ValueType {
	string = 'string',
	boolean = 'boolean',
	number = 'number',
}
