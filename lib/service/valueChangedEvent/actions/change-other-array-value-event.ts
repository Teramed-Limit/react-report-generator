import { Field, ValueChangedEvent } from '../../../types/field/field.ts';
import { checkCondition } from '../condition-matcher.ts';
import { Action, Condition } from './action';

interface ChangeOtherValueActionParam {
	// 若此下列條件成立
	condition: Condition[];
	// 更改此Id的值
	targetId: string;
	targetValue: string;
}

export class ChangeOtherArrayValueEvent extends Action<ChangeOtherValueActionParam[]> {
	name = 'ChangeOtherArrayValue';

	// eslint-disable-next-line class-methods-use-this
	execute = (
		params: {
			field: Field;
			value: any;
			valueChangedId: (string | number)[];
		},
		valueChangedEvent: ValueChangedEvent<ChangeOtherValueActionParam[]>,
		changeValue: (...args: any) => void,
	) => {
		valueChangedEvent.eventParams.forEach((param) => {
			const conditions = param.condition;

			for (let i = 0; i < conditions.length; i++) {
				const condition = conditions[i];
				if (checkCondition(condition.type, params.value, condition.value)) {
					const valueChangedId = params.valueChangedId.slice(0, -1);
					changeValue([...valueChangedId, param.targetId], param.targetValue);
					break;
				}
			}
		});
	};
}
