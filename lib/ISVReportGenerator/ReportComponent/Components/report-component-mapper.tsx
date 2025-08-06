import { ForwardRefExoticComponent, RefAttributes } from 'react';

import { ReportComponentProps } from '../report-component-props.tsx';

import ReportDynamicImageComponent from './DynamicImage/ReportDynamicImageComponent.tsx';
import ReportDynamicLabelComponent from './DynamicLabel/ReportDynamicLabelComponent';
import ReportImageComponent from './Image/ReportImageComponent';
import ReportLabelComponent from './Label/ReportLabelComponent';
import ReportLineComponent from './Line/ReportLineComponent';
import ReportPageNumberComponent from './PageNumber/ReportPageNumberComponent';

// ForwardRefExoticComponent<ReportComponentProps>
// 針對每個元件型態定義對應的 ref 型態
export interface ComponentRefMap {
	Label: Element;
	Image: Element;
	DynamicImage: Element;
	DynamicLabel: Element;
	Line: Element;
	PageNumber: Element;
}

// ReportComponentMapper 的型態定義
export const ReportComponentMapper: {
	[K in keyof ComponentRefMap]: ForwardRefExoticComponent<ReportComponentProps & RefAttributes<ComponentRefMap[K]>>;
} = {
	Label: ReportLabelComponent,
	Image: ReportImageComponent,
	DynamicImage: ReportDynamicImageComponent,
	DynamicLabel: ReportDynamicLabelComponent,
	Line: ReportLineComponent,
	PageNumber: ReportPageNumberComponent,
};
