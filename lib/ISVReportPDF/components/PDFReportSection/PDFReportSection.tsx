import React from 'react';

import ReactPDF from '@react-pdf/renderer';

import { reportSection } from '../../../ISVReport/style.ts';
import { Section } from '../../../types/define.ts';
import { Style } from '@react-pdf/types/style';

interface Props {
	section: Section;
	children?: React.ReactNode;
}

function PDFReportSection({ section, children }: Props) {
	return (
		<>
			{/* {section.label && ( */}
			{/*	<ReactPDF.View */}
			{/*		style={{ */}
			{/*			flexDirection: 'row', */}
			{/*			marginHorizontal: '1pt', */}
			{/*			marginTop: '4pt', */}
			{/*			alignItems: 'center', */}
			{/*		}} */}
			{/*	> */}
			{/*		<ReactPDF.View */}
			{/*			style={{ */}
			{/*				width: '4pt', */}
			{/*				height: '12pt', */}
			{/*				marginRight: '2pt', */}
			{/*				backgroundColor: 'rgb(113, 210, 222)', */}
			{/*			}} */}
			{/*		/> */}
			{/*		<ReactPDF.Text style={{ fontSize: '12pt' }}>{section.label}</ReactPDF.Text> */}
			{/*	</ReactPDF.View> */}
			{/* )} */}
			<ReactPDF.View
				wrap={false}
				style={{
					...(reportSection as Style | Style[]),
					...(section.style as Style | Style[]),
					maxWidth: section.maxWidth,
					width: section.maxWidth,
				}}
			>
				{children}
			</ReactPDF.View>
		</>
	);
}

export default React.memo(PDFReportSection);