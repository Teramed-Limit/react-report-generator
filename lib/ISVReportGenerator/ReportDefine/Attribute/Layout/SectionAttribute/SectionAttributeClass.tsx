import { Style } from '@react-pdf/types/style';

import { Section, SubSection } from '../../../../../types';
import { CSSStyle } from '../../Common/Complex/ReportCSSStyleAttribute/CSSStyle.ts';

export class SectionAttributeClass implements Section {
	id: string;
	label: string;
	hide: boolean;
	hideInPDF: boolean;
	type: string;
	maxWidth: string;
	isHeader: boolean;
	subSections: SubSection[];
	style: Style;
	labelStyle: Style;
	labelDecorationColor: string;

	constructor(section: Section) {
		this.id = section?.id;
		this.label = section?.label || '';
		this.hide = section.hide || false;
		this.hideInPDF = section.hideInPDF || false;
		this.type = section.type;
		this.maxWidth = section?.maxWidth || '100%';
		this.isHeader = section.isHeader || false;
		this.subSections = section.subSections || [];
		this.style = (section?.style as Style) || new CSSStyle();
		this.labelStyle = (section?.labelStyle as Style) || new CSSStyle();
		this.labelDecorationColor = section?.labelDecorationColor || '#71d2de';
	}
}
