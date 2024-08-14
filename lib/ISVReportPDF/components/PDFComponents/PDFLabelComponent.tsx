import React from 'react';

import ReactPDF from '@react-pdf/renderer';

import { RepLabelComponent } from '../../../types/report-generator/component/rep-label-component.ts';

interface Props {
	comp: RepLabelComponent;
}

function PDFLabelComponent({ comp }: Props) {
	return (
		<ReactPDF.Text
			style={{
				position: 'absolute',
				fontFamily: comp.fontName,
				fontStyle: comp.fontStyle,
				fontWeight: comp.fontWeight,
				color: comp.fontColor,
				fontSize: comp.fontSize,
				left: comp.x,
				top: comp.y,
			}}
		>
			{comp.prefix}
			{comp.value}
			{comp.suffix}
		</ReactPDF.Text>
	);
}

export default PDFLabelComponent;
