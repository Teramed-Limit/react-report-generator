import React from 'react';

import ReactPDF from '@react-pdf/renderer';
import { Style } from '@react-pdf/types/style';

import { FormFieldType } from '../../../field/field-type.ts';
import { reportPage } from '../../../ISVReport/style.ts';
import { Section, SubSection } from '../../../types/define.ts';
import { ArrayField } from '../../../types/field/array-field.ts';
import { CompositeField } from '../../../types/field/composite-field.ts';
import { Field } from '../../../types/field/field.ts';
import PDFArrayField from '../PDFArrayField/PDFArrayField.tsx';
import PDFCompositeField from '../PDFCompositeField/PDFCompositeField.tsx';
import PDFField from '../PDFField/PDFField.tsx';
import PDFReportSection from '../PDFReportSection/PDFReportSection.tsx';
import PDFReportSubSection from '../PDFReportSubSection/PDFReportSubSection.tsx';

interface Props {
	formSections: Section[];
	formData: Record<string, any>;
	getOptions: (id: string) => any[];
}

function PDFReportContent({ formSections, formData, getOptions }: Props) {
	return (
		<ReactPDF.View style={{ ...(reportPage as Style), width: '100%' }}>
			{formSections
				.filter((section: Section) => !section.hide)
				.filter((section: Section) => !section.hideInPDF)
				.map((section: Section) => (
					<PDFReportSection key={section.id} section={section}>
						{section.subSections
							.filter((subSection: SubSection) => !subSection.hide)
							.filter((subSection: SubSection) => !subSection.hideInPDF)
							.map((subSection: SubSection) => (
								<PDFReportSubSection key={subSection.id} subSection={subSection}>
									{subSection.fields
										.filter((field: Field) => !field.hide)
										.filter((field: Field) => !field.hideInPDF)
										.map((field: Field) => {
											switch (field.type) {
												case FormFieldType.Array:
													return (
														<PDFArrayField
															key={field.id}
															field={field as unknown as ArrayField}
															formData={formData}
															getOptions={getOptions}
														/>
													);
												case FormFieldType.Composite:
													return (
														<PDFCompositeField
															key={field.id}
															field={field as unknown as CompositeField}
															formData={formData}
															getOptions={getOptions}
														/>
													);
												default:
													return (
														<PDFField
															key={field.id}
															field={field}
															value={formData[field.id]}
															getOptions={getOptions}
														/>
													);
											}
										})}
								</PDFReportSubSection>
							))}
					</PDFReportSection>
				))}
		</ReactPDF.View>
	);
}

export default React.memo(PDFReportContent);
