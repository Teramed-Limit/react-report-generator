import React from 'react';

import ReactPDF from '@react-pdf/renderer';

import { RepPageNumberComponent } from '../../../types/report-generator/component/rep-page-num-component.ts';

interface Props {
	comp: RepPageNumberComponent;
}

function PDFPageNumberComponent({ comp }: Props) {
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
			render={({ pageNumber, totalPages }) => `${pageNumber}${comp.showTotalPages ? `/${totalPages}` : ''}`}
		/>
	);
}

export default PDFPageNumberComponent;
