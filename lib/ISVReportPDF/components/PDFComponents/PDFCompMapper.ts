import { ReportComponentType } from '../../../types/report-generator/component/rep-component';

import PDFDynamicImageComponent from './PDFDynamicImageComponent.tsx';
import PDFDynamicLabelComponent from './PDFDynamicLabelComponent';
import PDFImageComponent from './PDFImageComponent';
import PDFLabelComponent from './PDFLabelComponent';
import PDFLineComponent from './PDFLineComponent';
import PDFPageNumberComponent from './PDFPageNumberComponent';

export const PDFReportComponentMapper = {
	[ReportComponentType.Label]: PDFLabelComponent,
	[ReportComponentType.Image]: PDFImageComponent,
	[ReportComponentType.DynamicImage]: PDFDynamicImageComponent,
	[ReportComponentType.DynamicLabel]: PDFDynamicLabelComponent,
	[ReportComponentType.Line]: PDFLineComponent,
	[ReportComponentType.PageNumber]: PDFPageNumberComponent,
};
