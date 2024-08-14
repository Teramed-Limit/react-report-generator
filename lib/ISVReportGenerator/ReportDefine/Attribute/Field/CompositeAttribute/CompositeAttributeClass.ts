import { Style } from '@react-pdf/types/style';

import { FormFieldType } from '../../../../../field/field-type.ts';
import { CompositeField } from '../../../../../types/field/composite-field.ts';
import { CSSStyle } from '../../Common/Complex/ReportCSSStyleAttribute/CSSStyle';
import { CompositeInnerFieldAttributeClass } from './CompositeInnerFieldAttribute/CompositeInnerFieldAttributeClass.ts';

export class CompositeAttributeClass implements CompositeField {
	id: string;
	label?: string;
	labelWidth: string;
	type: FormFieldType;
	orientation: 'column' | 'row';
	compositeOrientation: 'column' | 'row';
	hint?: string;
	hide: boolean;
	hideInPDF: boolean;
	hideLabel?: boolean;
	labelStyle?: Style;
	fields: CompositeInnerFieldAttributeClass[];
	flexDistribution: number[];
	joinStr: string;

	constructor(field: CompositeField) {
		this.id = field.id || `CompositeField-${new Date().getTime()}`;
		this.hide = field.hide || false;
		this.hideInPDF = field.hideInPDF || false;
		this.label = field.label || '';
		this.labelWidth = field.labelWidth || '35%';
		this.type = field.type || FormFieldType.Text;
		this.orientation = field.orientation || 'row';
		this.compositeOrientation = field.compositeOrientation || 'column';
		this.hint = field.hint || '';
		this.hideLabel = field.hideLabel || false;
		this.labelStyle = (field.labelStyle as Style) || new CSSStyle();
		this.fields = field.fields || [this.addField(1), this.addField(2)];
		this.flexDistribution = field.flexDistribution || [1, 1];
		this.joinStr = field.joinStr || '';
	}

	addField = (index: number) => {
		return new CompositeInnerFieldAttributeClass({
			id: `${this.id}_Child${index}`,
			labelWidth: '35%',
			type: FormFieldType.Text,
			readOnly: false,
			orientation: 'row',
			valueStyle: new CSSStyle(),
		});
	};
}
