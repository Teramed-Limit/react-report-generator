import { ReportComponentType } from '../../../types/report-generator/component/rep-component';
import PDFDynamicLabelComponent from './PDFDynamicLabelComponent';
import PDFImageComponent from './PDFImageComponent';
import PDFLabelComponent from './PDFLabelComponent';
import PDFLineComponent from './PDFLineComponent';
import PDFPageNumberComponent from './PDFPageNumberComponent';
import PDFSignatureComponent from './PDFSignatureComponent';

export const PDFReportComponentMapper = {
	[ReportComponentType.Label]: PDFLabelComponent,
	[ReportComponentType.Image]: PDFImageComponent,
	[ReportComponentType.Signature]: PDFSignatureComponent,
	[ReportComponentType.DynamicLabel]: PDFDynamicLabelComponent,
	[ReportComponentType.Line]: PDFLineComponent,
	[ReportComponentType.PageNumber]: PDFPageNumberComponent,
};
