import { FormFieldType } from '../../../../../field/field-type.ts';
import { DiagramField } from '../../../../../types/field/diagram-field.ts';
import { BaseAttributeClass } from '../BaseAttribute/BaseAttributeClass.ts';

export class DiagramAttributeClass extends BaseAttributeClass implements DiagramField {
	hideToolbar: boolean;
	width?: string;
	height?: string;
	type = FormFieldType.ReportDiagram;

	constructor(field: DiagramField) {
		super(field);
		this.width = field.width || 'auto';
		this.height = field.height || 'auto';
		this.hideToolbar = field.hideToolbar || false;
		this.hideLabel = true;
	}
}
