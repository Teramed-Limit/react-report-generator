import React, { CSSProperties, useMemo } from 'react';

import { Box } from '@mui/material';

import { FormFieldType } from '../../../field/field-type.ts';
import { SubSection } from '../../../types/define.ts';
import { ArrayField } from '../../../types/field/array-field.ts';
import { CompositeField } from '../../../types/field/composite-field.ts';
import { Field } from '../../../types/field/field.ts';
import { ParagraphField } from '../../../types/field/paragraph-field.ts';
import { styleConverter } from '../../../utils/style-converter.ts';
import { reportSubsection } from '../../style.ts';
import FieldArrayContainer from '../FieldArrayContainer/FieldArrayContainer.tsx';
import FieldCompositeContainer from '../FieldCompositeContainer/FieldCompositeContainer.tsx';
import FieldContainer from '../FieldContainer/FieldContainer.tsx';
import FieldParagraphContainer from '../FieldParagraphContainer/FieldParagraphContainer.tsx';

interface Props {
	subSection: SubSection;
}

export function ReportSubSection({ subSection }: Props) {
	// 記憶化樣式物件，避免每次渲染都重新創建
	const boxStyle = useMemo(
		() => ({
			...reportSubsection,
			maxWidth: subSection?.maxWidth,
			width: subSection?.maxWidth,
			...((subSection?.style as CSSProperties) || {}),
			...styleConverter(subSection.style as CSSProperties),
		}),
		[subSection?.maxWidth, subSection?.style],
	);

	// 記憶化可見欄位列表，只有當欄位實際改變時才重新計算
	const visibleFields = useMemo(() => subSection.fields.filter((field) => !field.hide), [subSection.fields]);

	// 記憶化欄位渲染，避免每次都重新創建 JSX
	const renderedFields = useMemo(
		() =>
			visibleFields.map((field) => {
				switch (field.type) {
					case FormFieldType.Composite:
						return <FieldCompositeContainer key={field.id} id={field.id} field={field as CompositeField} />;
					case FormFieldType.Array:
						return <FieldArrayContainer key={field.id} field={field as ArrayField} />;
					case FormFieldType.Paragraph:
						return <FieldParagraphContainer key={field.id} id={field.id} field={field as ParagraphField} />;
					default:
						return (
							<FieldContainer
								key={field.id}
								id={field.id}
								field={field as Field}
								valueChangedId={[field.id]}
							/>
						);
				}
			}),
		[visibleFields],
	);

	return (
		<Box id={subSection.id} sx={boxStyle}>
			{renderedFields}
		</Box>
	);
}

// 使用 React.memo 記憶化組件，只有當 subSection 實際改變時才重新渲染
export default React.memo(ReportSubSection, (prevProps, nextProps) => {
	const prevSubSection = prevProps.subSection;
	const nextSubSection = nextProps.subSection;

	// 比較關鍵屬性
	return (
		prevSubSection.id === nextSubSection.id &&
		prevSubSection.maxWidth === nextSubSection.maxWidth &&
		JSON.stringify(prevSubSection.style) === JSON.stringify(nextSubSection.style) &&
		prevSubSection.fields.length === nextSubSection.fields.length &&
		// 比較欄位的關鍵屬性
		prevSubSection.fields.every((field, index) => {
			const nextField = nextSubSection.fields[index];
			return field.id === nextField.id && field.type === nextField.type && field.hide === nextField.hide;
		})
	);
});
