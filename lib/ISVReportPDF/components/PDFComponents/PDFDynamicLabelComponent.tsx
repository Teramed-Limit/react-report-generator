import React from 'react';

import ReactPDF from '@react-pdf/renderer';

import { RepLabelComponent } from '../../../types/report-generator/component/rep-label-component.ts';

interface Props {
	comp: RepLabelComponent;
	formData: Record<string, any>;
}

function PDFDynamicLabelComponent({ comp, formData }: Props) {
	return (
		<ReactPDF.Text
			style={{
				position: 'absolute',
				fontSize: `${comp.fontSize}`,
				fontFamily: comp.fontName,
				fontStyle: comp.fontStyle,
				fontWeight: comp.fontWeight,
				color: comp.fontColor,
				left: comp.x,
				top: comp.y,
			}}
		>
			{comp.prefix}
			{formData[comp.value]}
			{comp.suffix}
		</ReactPDF.Text>
	);
}

export default PDFDynamicLabelComponent;
