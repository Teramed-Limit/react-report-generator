import { FormFieldType } from '../../../../../field/field-type.ts';
import { CurveChartField } from '../../../../../types/field/curve-chart-field.ts';
import { BaseAttributeClass } from '../BaseAttribute/BaseAttributeClass.ts';

export class CurveChartAttributeClass extends BaseAttributeClass implements CurveChartField {
	width: string;
	height: string;
	chartType: string;
	type = FormFieldType.OBGYNChart;

	constructor(field: CurveChartField) {
		super(field);
		this.width = field.width || '100%';
		this.height = field.height || '300px';
		this.chartType = field.chartType || 'BPD';
	}
}
