import { Style } from '@react-pdf/types/style';

import { SubSection } from '../../../../../types/define.ts';
import { ArrayField } from '../../../../../types/field/array-field.ts';
import { CompositeField } from '../../../../../types/field/composite-field.ts';
import { Field } from '../../../../../types/field/field.ts';
import { ParagraphField } from '../../../../../types/field/paragraph-field.ts';
import { CSSStyle } from '../../Common/Complex/ReportCSSStyleAttribute/CSSStyle';

export class SubSectionAttributeClass implements SubSection {
	id: string;
	maxWidth?: string;
	fields: (Field | ArrayField | CompositeField | ParagraphField)[];
	style: Style;
	hideInPDF: boolean;
	hide: boolean;

	constructor(subSection: SubSection) {
		this.id = subSection.id;
		this.hide = subSection.hide || false;
		this.hideInPDF = subSection.hideInPDF || false;
		this.maxWidth = subSection.maxWidth || '';
		this.fields = subSection.fields || [];
		this.style = (subSection?.style as Style) || new CSSStyle();
	}
}
