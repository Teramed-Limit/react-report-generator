import { ColDef } from 'ag-grid-community';

import { FormFieldType } from '../../../../../field/field-type.ts';
import { GirdField } from '../../../../../types/field/gird-field.ts';
import { BaseAttributeClass } from '../BaseAttribute/BaseAttributeClass.ts';

export class GridTableAttributeClass extends BaseAttributeClass implements GirdField {
	type = FormFieldType.GridTable;
	colDefs: ColDef[];
	gridFontSize: number;
	gridFontName: string;
	gridFontColor: string;
	gridFontWeight: string;

	constructor(data: GirdField) {
		super(data);
		this.colDefs = data.colDefs || [];
		this.hideLabel = true;
		this.labelWidth = '0%';
		this.label = '';
		this.gridFontSize = data.gridFontSize || 10;
		this.gridFontName = data.gridFontName || 'Microsoft JhengHei';
		this.gridFontColor = data.gridFontColor || '#000';
		this.gridFontWeight = data.gridFontWeight || 'normal';
	}
}
