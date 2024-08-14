import { Field, ValueChangedEvent } from '../../../types/field/field.ts';

export interface Condition {
	type: string;
	value: string;
}

export abstract class Action<T = any> {
	abstract execute(
		params: {
			// 變動的Field
			field: Field;
			// 變動的Value
			value: any;
			// 變動的Field Id
			valueChangedId: (string | number)[];
		},
		valueChangedEvent: ValueChangedEvent<T>,
		changeValue: (...args: any) => void,
	): void;
}
