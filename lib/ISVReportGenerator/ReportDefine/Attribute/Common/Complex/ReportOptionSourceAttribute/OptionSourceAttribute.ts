import { OptionSource } from '../../../../../../types/field/selection-field.ts';

export class OptionSourceAttribute implements OptionSource {
	type: string;
	source: string;
	labelKey: string;
	key: string;

	constructor(value: OptionSource) {
		this.type = value.type || 'http';
		this.source = value.source || 'ReportTemplate';
		this.labelKey = value.labelKey || 'label';
		this.key = value.key || 'value';
	}
}
