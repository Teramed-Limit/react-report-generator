import React from 'react';

import ReactPDF from '@react-pdf/renderer';
import { Style } from '@react-pdf/types/style';
import { isNotEmpty } from 'ramda';

import { CompositeField } from '../../../types/field/composite-field.ts';
import PDFFieldContainer from '../PDFFieldContainer/PDFFieldContainer';
import PDFFieldLabel from '../PDFFieldLabel/PDFFieldLabel';
import PDFFieldRenderer from '../PDFFieldRenderer/PDFFieldRenderer';

interface Props {
	field: CompositeField;
	formData: Record<string, any>;
	getOptions: (id: string) => any[];
}

function PDFCompositeField({ field, formData, getOptions }: Props) {
	return (
		<PDFFieldContainer orientation={field.orientation}>
			{/* Label */}
			<PDFFieldLabel field={field} />
			{/* Value */}
			<ReactPDF.View
				style={{
					flex: '0 0 auto',
					flexDirection: field.compositeOrientation,
					width: field.orientation === 'column' ? '100%' : `calc(100% - ${field.labelWidth || '35%'})`,
				}}
			>
				{field.fields.map((compositeChildField, idx) => {
					const compositeChildValue = formData[compositeChildField.id];
					const isLastJoinStr = isNotEmpty(field.joinStr) && idx === field.fields.length - 1;
					return (
						<React.Fragment key={compositeChildField.id}>
							<ReactPDF.View
								style={{
									flexGrow: 0,
									flexShrink: 0,
									flexBasis: 'auto',
									padding:
										field.orientation === 'row' && field.compositeOrientation === 'row' && idx > 0
											? '0 3px'
											: '0',
								}}
							>
								<PDFFieldRenderer
									field={compositeChildField}
									value={compositeChildValue}
									getOptions={getOptions}
								/>
							</ReactPDF.View>
							{field.joinStr && !isLastJoinStr && (
								<ReactPDF.Text
									style={{ ...((compositeChildField.valueStyle as Style | Style[]) || {}) }}
								>
									{field.joinStr}
								</ReactPDF.Text>
							)}
						</React.Fragment>
					);
				})}
			</ReactPDF.View>
		</PDFFieldContainer>
	);
}

export default React.memo(PDFCompositeField);
