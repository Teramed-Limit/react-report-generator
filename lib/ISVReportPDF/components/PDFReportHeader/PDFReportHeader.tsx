import React from 'react';

import ReactPDF from '@react-pdf/renderer';

import { RepPage } from '../../../types';
import { PDFReportComponentMapper } from '../PDFComponents/PDFCompMapper.ts';

interface Props {
	page: RepPage;
	formData: Record<string, any>;
	children?: React.ReactNode;
}

function PDFReportHeader({ page, formData, children }: Props) {
	return (
		<>
			<ReactPDF.View
				fixed
				style={{
					position: 'relative',
					width: `100%`,
					height: `${page.height}px`,
				}}
			>
				{page.components &&
					Object.entries(page.components).map(([uuid, comp]) => {
						const RenderComponent = PDFReportComponentMapper[comp.componentType];
						if (!RenderComponent) return <React.Fragment key={uuid} />;
						return <RenderComponent key={uuid} uuid={uuid} comp={comp} page={page} formData={formData} />;
					})}
			</ReactPDF.View>
			<ReactPDF.View fixed>{children}</ReactPDF.View>
		</>
	);
}

export default React.memo(PDFReportHeader);
