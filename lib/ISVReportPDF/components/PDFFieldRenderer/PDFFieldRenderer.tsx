import React from 'react';

import ReactPDF, { Font } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types/style';

import { FormFieldType } from '../../../field/field-type.ts';
import { Field } from '../../../types';
import { DateField } from '../../../types/field/date-field.ts';
import { DiagramField } from '../../../types/field/diagram-field.ts';
import { RadioField } from '../../../types/field/radio-field.ts';
import { SelectionField } from '../../../types/field/selection-field.ts';
import { TextField } from '../../../types/field/text-field.ts';
import { convertToDate, emptyBaseImage, isEmptyOrNil, stringFormatDate } from '../../../utils/general.ts';
import { CheckboxCheckedIcon, CheckboxUnCheckedIcon } from '../../assets';
import { styles } from '../../styles/style.ts';

Font.registerHyphenationCallback((word: string) => {
	// 判斷是否為中文字符
	const isChinese = (char: string) => /[\u4e00-\u9fa5]/.test(char);

	if (word.length === 1) {
		return [word];
	}

	// 若字串中含有中文
	if (Array.from(word).some(isChinese)) {
		return Array.from(word)
			.map((char) => [char, ''])
			.reduce((arr, current) => {
				arr.push(...current);
				return arr;
			}, []);
	}

	// 若字串全為英文，則不做斷字處理
	return [word];
});

interface Props {
	field: Field;
	value: string;
	getOptions: (id: string) => any[];
}

const PDFFieldRenderer = ({ field, value, getOptions }: Props) => {
	const fieldRenderer = (rendererField, rendererValue) => {
		switch (rendererField.type) {
			case FormFieldType.Text:
				return text(rendererField, rendererValue);
			case FormFieldType.TextArea:
				return textArea(rendererField, rendererValue);
			case FormFieldType.Checkbox:
				return checkBox(rendererField, rendererValue);
			case FormFieldType.Radio:
				return radio(rendererField, rendererValue);
			case FormFieldType.CodeListSelection:
				return selection(rendererField, rendererValue);
			case FormFieldType.ReportDiagram:
				return reportDiagram(rendererField, rendererValue);
			case FormFieldType.DatePicker:
				return datePicker(rendererField, rendererValue);
			default:
				return text(rendererField, rendererValue);
		}
	};

	const selection = (rendererField: SelectionField, rendererValue) => {
		const labelKey = rendererField.optionSource.labelKey || 'label';
		const valueKey = rendererField.optionSource.key || 'value';
		const codelist = getOptions(rendererField.optionSource.source);

		if (rendererField.isMulti) {
			// 一律用Label顯示
			const labelList = (rendererValue as string[])?.map((optValue) => {
				const foundOption = codelist.find((option) => option[valueKey] === optValue);
				return foundOption?.label || '';
			});

			if (isEmptyOrNil(labelList)) return text(rendererField, '');

			// const newValue = (labelList as string[])?.join('\n') || '';
			const defaultJoinStr = ', ';
			const newValue = (labelList as string[])?.join(rendererField?.joinStr || defaultJoinStr) || '';
			return text(rendererField, newValue);
		}

		// 一律用Label顯示
		const foundOption = codelist.find((option) => option[valueKey] === rendererValue);
		if (!foundOption) return text(rendererField, rendererValue);
		return text(rendererField, foundOption[labelKey]);
	};

	const radio = (rendererField: RadioField, rendererValue: string) => {
		const labelKey = rendererField.optionSource.labelKey || 'label';
		const valueKey = rendererField.optionSource.key || 'value';
		const codelist = getOptions(rendererField.optionSource.source);

		const foundOption = codelist.find((option) => option[valueKey] === rendererValue);
		if (!foundOption) return text(rendererField, rendererValue);
		return text(rendererField, foundOption[labelKey]);
	};

	const checkBox = (rendererField: Field, rendererValue: string) => {
		return (
			<>
				<ReactPDF.View style={{ ...styles.checkbox }}>
					{rendererValue === '1' ? (
						<ReactPDF.Image
							style={{
								...styles.icon,
								width: ((rendererField.labelStyle as Style).fontSize as number) * 1.3,
								height: ((rendererField.labelStyle as Style).fontSize as number) * 1.3,
							}}
							src={CheckboxCheckedIcon}
						/>
					) : (
						<ReactPDF.Image
							style={{
								...styles.icon,
								width: ((rendererField.labelStyle as Style).fontSize as number) * 1.3,
								height: ((rendererField.labelStyle as Style).fontSize as number) * 1.3,
							}}
							src={CheckboxUnCheckedIcon}
						/>
					)}
				</ReactPDF.View>
			</>
		);
	};

	const textArea = (rendererField: Field, rendererValue: string) => {
		return <>{text(rendererField, rendererValue)}</>;
	};

	const text = (renderedField: TextField, rendererValue: string) => {
		if (isEmptyOrNil(rendererValue)) return <></>;
		return (
			<>
				<ReactPDF.Text style={{ ...((renderedField.valueStyle as Style | Style[]) || {}) }}>
					{!isEmptyOrNil(rendererValue) && !isEmptyOrNil(renderedField?.prefix) && (
						<ReactPDF.Text>{renderedField?.prefix}&nbsp;</ReactPDF.Text>
					)}
					{rendererValue}
					{!isEmptyOrNil(rendererValue) && !isEmptyOrNil(renderedField?.suffix) && (
						<ReactPDF.Text>&nbsp;{renderedField?.suffix}</ReactPDF.Text>
					)}
				</ReactPDF.Text>
			</>
		);
	};

	const datePicker = (renderedField: DateField, rendererValue: string) => {
		if (isEmptyOrNil(rendererValue)) return <></>;
		const date = stringFormatDate(rendererValue, renderedField.fromFormat || 'yyyy-MM-dd');
		const formatValue = convertToDate(date, renderedField.toFormat || 'yyyy-MM-dd');
		return (
			<>
				<ReactPDF.Text style={{ ...((renderedField.valueStyle as Style | Style[]) || {}) }}>
					{!isEmptyOrNil(formatValue) && !isEmptyOrNil(renderedField?.prefix) && (
						<ReactPDF.Text>{renderedField?.prefix}&nbsp;</ReactPDF.Text>
					)}
					{formatValue}
					{!isEmptyOrNil(formatValue) && !isEmptyOrNil(renderedField?.suffix) && (
						<ReactPDF.Text>&nbsp;{renderedField?.suffix}</ReactPDF.Text>
					)}
				</ReactPDF.Text>
			</>
		);
	};

	const reportDiagram = (renderedField: DiagramField, rendererValue: string) => {
		return (
			<ReactPDF.Image
				style={{
					objectFit: 'contain',
					objectPosition: 'center',
					width: renderedField?.width ? renderedField.width : 'auto',
					height: renderedField?.height ? renderedField.height : 'auto',
				}}
				src={rendererValue || emptyBaseImage()}
			/>
		);
	};

	return fieldRenderer(field, value);
};

export default React.memo(PDFFieldRenderer);
