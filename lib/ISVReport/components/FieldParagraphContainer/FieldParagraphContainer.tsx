import React, { CSSProperties } from 'react';

import { Stack } from '@mui/material';

import { noLabelField } from '../../../field/field-type.ts';
import { ParagraphField } from '../../../types/field/paragraph-field.ts';
import { styleConverter } from '../../../utils/style-converter.ts';
import { fieldSectionContainer } from '../../style.ts';
import FieldContainer from '../FieldContainer/FieldContainer.tsx';
import FieldLabel from '../FieldLabel/FieldLabel.tsx';

interface Props {
	id: string;
	field: ParagraphField;
}

function FieldParagraphContainer({ id, field }: Props) {
	// 解析包含 %s 的字串，將其分割成文字段和輸入欄位段
	const parseTextWithInputs = (text: string) => {
		const parts = text.split('%s');
		const elements: React.ReactNode[] = [];

		for (let i = 0; i < parts.length; i++) {
			// 添加文字部分（包括空字串，但不包括純空白
			if (parts[i] !== undefined && parts[i] !== '') {
				elements.push(
					<FieldLabel
						key={`text-${i}`}
						id={field.id}
						label={parts[i]}
						labelStyle={{
							...(field.labelStyle as CSSProperties),
							display: 'flex',
							lineHeight: 1.5,
							...styleConverter(field.labelStyle as CSSProperties),
						}}
						hint={undefined}
						hideLabelSection={noLabelField[field.type]}
						hasValidation={false}
						prefixComp={null}
						suffixComp={null}
					/>,
				);
			}

			// 如果不是最後一個部分，添加輸入欄位
			if (i < parts.length - 1 && i < field.fields.length) {
				const currentField = field.fields[i];
				if (currentField && currentField.id) {
					elements.push(
						<FieldContainer
							key={currentField.id}
							id={`${id}_${currentField.id}`}
							containerStyle={{
								maxWidth: currentField.maxWidth,
								padding: '0 4px',
								flex: 1,
							}}
							field={{ ...currentField, hideLabel: true, labelWidth: '0%', orientation: 'row' }}
							valueChangedId={[currentField.id]}
						/>,
					);
				}
			}
		}

		return elements;
	};

	return (
		<Stack
			id={`FieldContainer_${id}`}
			direction="row"
			sx={{
				...fieldSectionContainer,
			}}
		>
			{field.text && parseTextWithInputs(field.text)}
		</Stack>
	);
}

// 使用自定義比較函數的 React.memo，確保只有真正需要更新的情況下才重新渲染
export default React.memo(FieldParagraphContainer);
