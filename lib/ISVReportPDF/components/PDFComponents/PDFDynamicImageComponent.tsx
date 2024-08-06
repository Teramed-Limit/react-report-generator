import React from 'react';

import ReactPDF from '@react-pdf/renderer';

import { RepImageComponent } from '../../../types/report-generator/component/rep-image-component.ts';

interface Props {
	comp: RepImageComponent;
	formData: Record<string, any>;
}

function PDFDynamicImageComponent({ comp, formData }: Props) {
	return (
		<ReactPDF.Image
			style={{
				position: 'absolute',
				objectFit: 'contain',
				width: comp.width,
				height: comp.height,
				left: comp.x,
				top: comp.y,
			}}
			src={formData[comp.src]}
		/>
	);
}

export default PDFDynamicImageComponent;
