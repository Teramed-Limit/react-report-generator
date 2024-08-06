import React from 'react';

import ReactPDF from '@react-pdf/renderer';

import { RepPage } from '../../../types';
import { PDFReportComponentMapper } from '../PDFComponents/PDFCompMapper';

interface Props {
	page: RepPage;
	formData: Record<string, any>;
	children?: React.ReactNode;
}

function PDFReportFooter({ page, formData, children }: Props) {
	return (
		<>
			<ReactPDF.View
				fixed
				style={{
					position: 'absolute',
					width: page.width,
					height: `${page.height}px`,
					left: 0,
					bottom: 0,
				}}
			>
				{page.components &&
					Object.entries(page.components).map(([uuid, comp]) => {
						const RenderComponent = PDFReportComponentMapper[comp.componentType];
						if (!RenderComponent) return <></>;
						return <RenderComponent key={uuid} uuid={uuid} comp={comp} page={page} formData={formData} />;
					})}
			</ReactPDF.View>
			<ReactPDF.View fixed>{children}</ReactPDF.View>
		</>
	);
}

export default React.memo(PDFReportFooter);
