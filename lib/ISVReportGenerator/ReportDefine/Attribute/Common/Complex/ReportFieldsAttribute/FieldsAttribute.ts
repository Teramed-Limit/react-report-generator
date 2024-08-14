import { Field } from '../../../../../../types/field/field.ts';

export class FieldsAttribute {
	fields: Field[];

	constructor(value: Field[]) {
		this.fields = value || [];
	}
}
