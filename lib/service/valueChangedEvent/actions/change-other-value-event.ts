import { Field, ValueChangedEvent } from '../../../types/field/field.ts';
import { checkCondition } from '../condition-matcher.ts';

import { Action, Condition } from './action.ts';

interface ChangeOtherValueActionParam {
	// 若此下列條件成立
	condition: Condition[];
	// 更改此Id的值
	targetId: string;
	targetValue: string;
}

export class ChangeOtherValueEvent extends Action<ChangeOtherValueActionParam[]> {
	name = 'ChangeOtherValue';

	// eslint-disable-next-line class-methods-use-this
	execute = (
		params: {
			// 變動的Field
			field: Field;
			// 變動的Value
			value: any;
			// 變動的Field Id
			valueChangedId: (string | number)[];
		},
		valueChangedEvent: ValueChangedEvent<ChangeOtherValueActionParam[]>,
		changeValue: (...args) => void,
	) => {
		valueChangedEvent.eventParams.forEach((param) => {
			const conditions = param.condition;

			for (let i = 0; i < conditions.length; i++) {
				const condition = conditions[i];
				if (checkCondition(condition.type, params.value, condition.value)) {
					changeValue(param.targetId, param.targetValue);
					break;
				}
			}
		});
	};
}
