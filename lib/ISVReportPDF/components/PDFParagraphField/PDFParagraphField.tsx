import React from 'react';

import ReactPDF from '@react-pdf/renderer';

import { Style } from '@react-pdf/types/style';
import { ParagraphField } from '../../../types/field/paragraph-field.ts';
import { isEmptyOrNil } from '../../../utils/general.ts';
import PDFFieldContainer from '../PDFFieldContainer/PDFFieldContainer.tsx';

interface Props {
	field: ParagraphField;
	formData: Record<string, any>;
	getOptions: (id: string) => any[];
}

function PDFParagraphField({ field, formData, getOptions }: Props) {
	// 解析包含 %s 的字串，將其分割成文字段和輸入欄位段
	const parseTextWithInputs = (text: string) => {
		const parts = text.split('%s');
		const elements: React.ReactNode[] = [];

		for (let i = 0; i < parts.length; i++) {
			// 添加文字部分
			if (parts[i]) {
				elements.push(
					<ReactPDF.Text key={`text-${i}`} style={{ ...(field.labelStyle as Style) }}>
						{parts[i]}
					</ReactPDF.Text>,
				);
			}

			// 如果不是最後一個部分，添加輸入欄位
			if (i < parts.length - 1) {
				const inputFieldId = field.fields[i].id;
				if (!inputFieldId) return null;
				const inputValue = formData[inputFieldId] || '';

				elements.push(
					<ReactPDF.Text key={`input-${i}`} style={{ ...(field.fields[i].valueStyle as Style) }}>
						{!isEmptyOrNil(inputValue) && !isEmptyOrNil(field.fields[i]?.prefix) && (
							<ReactPDF.Text>{field.fields[i]?.prefix}&nbsp;</ReactPDF.Text>
						)}
						{inputValue}
						{!isEmptyOrNil(inputValue) && !isEmptyOrNil(field.fields[i]?.suffix) && (
							<ReactPDF.Text>&nbsp;{field.fields[i]?.suffix}</ReactPDF.Text>
						)}
					</ReactPDF.Text>,
				);
			}
		}

		return elements;
	};

	return (
		<PDFFieldContainer orientation="row">
			<ReactPDF.Text style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
				{parseTextWithInputs(field.text || '')}
			</ReactPDF.Text>
		</PDFFieldContainer>
	);
}

export default React.memo(PDFParagraphField);
