import { Field, FormControl, FormDefine } from '../../types';

import { Action } from './actions/action';
import { ChangeOtherArrayValueEvent } from './actions/change-other-array-value-event';
import { ChangeOtherValueEvent } from './actions/change-other-value-event';

export abstract class ReportField {
	abstract execute(
		data: Record<string, any>,
		define: FormDefine,
		changeValue: (id: string, value: any, state?: Partial<FormControl>) => void,
	);
}

export class ReportDataService {
	factoryMapper = new Map<string, ReportField>();
	actionContainer = new Map<string, Action>();

	constructor() {
		// By action
		this.actionContainer.set('ChangeOtherValue', new ChangeOtherValueEvent());
		this.actionContainer.set('ChangeOtherArrayValue', new ChangeOtherArrayValueEvent());
	}

	postValueChangedByAction(
		params: {
			// 變動的Field
			field: Field;
			// 變動的Value
			value: any;
			// 變動的Field Id
			valueChangedId: (string | number)[];
		},
		changeValue: (valueChangedId: (string | number)[], value: string) => void,
	): void {
		if (!params.field?.valueChangedEvent) return;
		const actionFunction = this.actionContainer.get(params.field.valueChangedEvent.event);
		if (actionFunction) {
			actionFunction.execute(params, params.field.valueChangedEvent, changeValue);
		} else {
			console.error(
				`postValueChangedByAction error, 找不到對應的action, ${params.field.valueChangedEvent.event}`,
			);
		}
	}
}
