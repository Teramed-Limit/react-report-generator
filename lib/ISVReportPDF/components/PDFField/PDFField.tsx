import React from 'react';

import ReactPDF from '@react-pdf/renderer';

import { Field } from '../../../types/field/field.ts';
import PDFFieldContainer from '../PDFFieldContainer/PDFFieldContainer';
import PDFFieldLabel from '../PDFFieldLabel/PDFFieldLabel';
import PDFFieldRenderer from '../PDFFieldRenderer/PDFFieldRenderer';

interface Props {
	field: Field;
	value: string;
	getOptions: (id: string) => any[];
	getFormValue: (path: (string | number)[]) => any;
}

function PDFField({ field, value, getOptions, getFormValue }: Props) {
	return (
		<PDFFieldContainer orientation={field.orientation}>
			{/* Label */}
			<PDFFieldLabel field={field} />
			{/* Value */}
			<ReactPDF.View
				style={{
					width: field.orientation === 'column' ? '100%' : `calc(100% - ${field.labelWidth || '35%'})`,
				}}
			>
				<PDFFieldRenderer field={field} value={value} getOptions={getOptions} getFormValue={getFormValue} />
			</ReactPDF.View>
		</PDFFieldContainer>
	);
}

export default React.memo(PDFField);
