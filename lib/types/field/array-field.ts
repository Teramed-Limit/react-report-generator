import { FormFieldType } from '../../field/field-type.ts';

import { CompositeField } from './composite-field.ts';
import { Field } from './field';

export interface ArrayField {
	id: string;
	type: FormFieldType;
	hide?: boolean;
	hideInPDF?: boolean;
	orientation: 'column' | 'row';
	arrayOrientation?: 'column' | 'row';
	templateField: Field | CompositeField;
}
