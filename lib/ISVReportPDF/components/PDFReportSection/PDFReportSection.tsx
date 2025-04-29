import React from 'react';

import ReactPDF from '@react-pdf/renderer';
import { Style } from '@react-pdf/types/style';

import { reportSection } from '../../../ISVReport/style.ts';
import { Section } from '../../../types/define.ts';

interface Props {
	section: Section;
	children?: React.ReactNode;
}

function PDFReportSection({ section, children }: Props) {
	return (
		<ReactPDF.View
			wrap={false}
			style={{
				...(reportSection as Style),
				...(section.style as Style),
				maxWidth: section.maxWidth,
				width: section.maxWidth,
			}}
		>
			{children}
		</ReactPDF.View>
	);
}

export default React.memo(PDFReportSection);
