import React from 'react';

import ReactPDF from '@react-pdf/renderer';
import { Style } from '@react-pdf/types/style';

import { noLabelField } from '../../../field/field-type.ts';
import { Field } from '../../../types/field/field.ts';

interface Props {
	field: Field;
}

function PDFFieldLabel({ field }: Props) {
	return (
		<>
			{!field.hideLabel && !noLabelField[field.type] && (
				<ReactPDF.View style={{ minWidth: field?.labelWidth || '35%' }}>
					{field.label && (
						<ReactPDF.Text style={(field.labelStyle as Style | Style[]) || {}}>{field.label}</ReactPDF.Text>
					)}
				</ReactPDF.View>
			)}
		</>
	);
}

export default React.memo(PDFFieldLabel);
