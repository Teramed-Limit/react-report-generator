import React from 'react';

import ReactPDF from '@react-pdf/renderer';
import { Style } from '@react-pdf/types/style';

import { fieldSectionContainer } from '../../../ISVReport/style.ts';

interface Props {
	orientation: 'column' | 'row';
	children: React.ReactNode;
}

function PDFFieldContainer({ orientation, children }: Props) {
	return (
		<ReactPDF.View
			wrap={false}
			style={{
				...(fieldSectionContainer as Style),
				...{ padding: 0 },
				...{ flexDirection: orientation },
			}}
		>
			{children}
		</ReactPDF.View>
	);
}

export default React.memo(PDFFieldContainer);
