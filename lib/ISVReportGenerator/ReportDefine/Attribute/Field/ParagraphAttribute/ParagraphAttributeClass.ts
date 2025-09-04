import { Style } from 'util';
import { FormFieldType } from '../../../../../field/field-type';
import { ParagraphField, ParagraphInnerField } from '../../../../../types/field/paragraph-field';
import { CSSStyle } from '../../Common/Complex/ReportCSSStyleAttribute/CSSStyle';
import { ParagraphInnerFieldsAttributeClass } from './ParagraphInnerFieldsAttributeComponent/ParagraphInnerFieldsAttributeClass';

export class ParagraphAttributeClass implements ParagraphField {
	id: string;
	type: FormFieldType;
	labelStyle: CSSStyle & Style;
	text: string;
	fields: ParagraphInnerField[];
	hide: boolean;
	hideInPDF: boolean;

	constructor(field: ParagraphField) {
		this.id = field.id || `ParagraphField-${new Date().getTime()}`;
		this.type = field.type || FormFieldType.Paragraph;
		this.text = field.text || 'This is a paragraph %s';
		this.fields = field.fields || [];
		this.labelStyle = field.labelStyle as CSSStyle & Style;
		this.hide = field.hide || false;
		this.hideInPDF = field.hideInPDF || false;
		this.fields = field.fields || [
			new ParagraphInnerFieldsAttributeClass({
				id: `${this.id}_Child_0`,
				type: FormFieldType.Text,
				maxWidth: '10%',
			}),
		];
	}
}
