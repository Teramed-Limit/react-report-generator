import { Style } from '@react-pdf/types/style';

import { Section, SubSection } from '../../../../../types/define.ts';
import { CSSStyle } from '../../Common/Complex/ReportCSSStyleAttribute/CSSStyle.ts';

export class SectionAttributeClass implements Section {
	id: string;
	hide: boolean;
	hideInPDF: boolean;
	// label: string;
	type: string;
	maxWidth: string;
	isHeader: boolean;
	subSections: SubSection[];
	style: Style;

	constructor(section: Section) {
		this.id = section?.id;
		this.hide = section.hide || false;
		this.hideInPDF = section.hideInPDF || false;
		// this.label = section.label || '';
		this.type = section.type;
		this.maxWidth = section?.maxWidth || '100%';
		this.isHeader = section.isHeader || false;
		this.subSections = section.subSections || [];
		this.style = (section?.style as Style) || new CSSStyle();
	}
}
