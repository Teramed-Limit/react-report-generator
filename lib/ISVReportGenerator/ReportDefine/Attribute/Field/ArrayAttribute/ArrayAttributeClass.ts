import { FormFieldType } from '../../../../../field/field-type';
import { ArrayField } from '../../../../../types/field/array-field.ts';
import { CompositeField } from '../../../../../types/field/composite-field.ts';
import { Field } from '../../../../../types/field/field.ts';
import { TextAttributeClass } from '../TextAttribute/TextAttributeClass.ts';

export class ArrayAttributeClass implements ArrayField {
	id: string;
	type: FormFieldType;
	hide: boolean;
	hideInPDF: boolean;
	orientation: 'column' | 'row';
	arrayOrientation: 'column' | 'row';
	templateField: Field | CompositeField;

	constructor(field: ArrayField) {
		this.id = field.id || `ArrayField-${new Date().getTime()}`;
		this.type = FormFieldType.Array;
		this.orientation = field.orientation || 'column';
		this.arrayOrientation = field.arrayOrientation || 'column';
		this.hide = field.hide || false;
		this.hideInPDF = field.hideInPDF || false;
		this.templateField =
			field.templateField ||
			new TextAttributeClass({
				id: `TemplateField-${new Date().getTime()}`,
				label: 'Label',
				labelWidth: '35%',
				orientation: 'row',
				type: FormFieldType.Text,
			});
	}
}
