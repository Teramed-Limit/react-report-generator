import React from 'react';

import ReactPDF from '@react-pdf/renderer';
import { Style } from '@react-pdf/types/style';

import { reportSubsection } from '../../../ISVReport/style.ts';
import { SubSection } from '../../../types/define.ts';

interface Props {
	subSection: SubSection;
	children?: React.ReactNode;
}

function PDFReportSubSection({ subSection, children }: Props) {
	return (
		<ReactPDF.View
			style={{
				...(reportSubsection as Style),
				...(subSection.style as Style[]),
				maxWidth: subSection.maxWidth,
				width: subSection.maxWidth,
			}}
		>
			{children}
		</ReactPDF.View>
	);
}

export default React.memo(PDFReportSubSection);
