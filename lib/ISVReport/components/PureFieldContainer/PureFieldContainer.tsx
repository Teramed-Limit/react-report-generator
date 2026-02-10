import React, { CSSProperties, useMemo } from 'react';

import { Stack } from '@mui/material';

import { FieldMapper } from '../../../field/field-mapper.tsx';
import { noBorderField, noHoverField, noLabelField, noPaddingField } from '../../../field/field-type.ts';
import { Field } from '../../../types/field/field.ts';
import { ValidateType } from '../../../types/validate.ts';
import { styleConverter } from '../../../utils/style-converter.ts';
import { fieldSectionContainer } from '../../style.ts';
import FieldDynamicRenderer from '../FieldDynamicRenderer/FieldDynamicRenderer.tsx';
import FieldLabel from '../FieldLabel/FieldLabel.tsx';
import FieldValue from '../FieldValue/FieldValue.tsx';
import PureFieldButtonBar from '../PureFieldButtonBar/PureFieldButtonBar.tsx';

export interface FieldState {
	isDirty?: boolean;
	isValid?: boolean;
	errorMessage?: string;
}

export interface PureFieldContainerProps {
	/** 欄位唯一識別碼 */
	id: string;
	/** 欄位定義 */
	field: Field;
	/** 欄位目前的值 */
	value: any;
	/** 欄位驗證狀態 */
	fieldState?: FieldState;
	/** 表單是否停用 */
	disabled?: boolean;
	/** 欄位類型對應的渲染組件 */
	fieldMapper?: { [key: string]: React.ComponentType<any> };
	/** 容器樣式 */
	containerStyle?: CSSProperties;
	/** Label 前綴組件 */
	prefixComp?: React.JSX.Element;
	/** Label 後綴組件 */
	suffixComp?: React.JSX.Element;
	/** 值變更事件回調 */
	onValueChange?: (value: any) => void;
	/** 按鈕點擊事件回調 */
	onButtonClick?: (buttonId: string, field: Field) => void;
}

function PureFieldContainer({
	id,
	field,
	value,
	fieldState = {},
	disabled = false,
	fieldMapper = FieldMapper,
	containerStyle,
	prefixComp,
	suffixComp,
	onValueChange,
	onButtonClick,
}: PureFieldContainerProps) {
	// 記憶化樣式和配置物件
	const labelStyleMemo = useMemo(
		() => ({
			display: 'flex',
			flex: `0 0 ${field.labelWidth || '35%'}`,
			maxWidth: field.labelWidth || '35%',
			lineHeight: 1.5,
			...(field.labelStyle as CSSProperties),
			...styleConverter(field.labelStyle as CSSProperties),
		}),
		[field.labelWidth, field.labelStyle],
	);

	const valueStyleMemo = useMemo(
		() => ({
			...(field.valueStyle as CSSProperties),
			flex: `1 1 auto`,
			maxWidth: '100%',
			height: '100%',
			lineHeight: 1.5,
			...styleConverter(field.valueStyle as CSSProperties),
		}),
		[field.valueStyle],
	);

	const containerStyleMemo = useMemo(
		() => ({
			...fieldSectionContainer,
			...containerStyle,
		}),
		[containerStyle],
	);

	// 記憶化子組件 props
	const fieldLabelProps = useMemo(
		() => ({
			id,
			label: field.label,
			labelStyle: labelStyleMemo,
			hint: field.hint,
			hideLabelSection: field.hideLabel || noLabelField[field.type],
			hasValidation: field.validate !== undefined && field.validate?.type !== ValidateType.None,
			prefixComp,
			suffixComp,
		}),
		[
			id,
			field.label,
			field.hint,
			field.hideLabel,
			field.type,
			field.validate,
			labelStyleMemo,
			prefixComp,
			suffixComp,
		],
	);

	const fieldValueProps = useMemo(
		() => ({
			id,
			readOnly: !!field.readOnly,
			isDirty: fieldState?.isDirty ?? false,
			isValid: fieldState?.isValid ?? true,
			errorMessage: fieldState?.errorMessage ?? '',
			disabled,
			noBorder: noBorderField[field.type],
			noHover: noHoverField[field.type],
			noPadding: noPaddingField[field.type],
			valueStyle: valueStyleMemo,
		}),
		[
			id,
			field.readOnly,
			field.type,
			fieldState?.isDirty,
			fieldState?.isValid,
			fieldState?.errorMessage,
			disabled,
			valueStyleMemo,
		],
	);

	const buttonBarComponent = useMemo(
		() => <PureFieldButtonBar field={field} modifiable={!disabled} onButtonClick={onButtonClick} />,
		[field, disabled, onButtonClick],
	);

	const fieldComponent = useMemo(
		() => (
			<FieldDynamicRenderer
				id={id}
				field={field}
				value={value}
				fieldMapper={fieldMapper}
				modifiable={!disabled}
				onValueChange={onValueChange}
			/>
		),
		[id, field, value, fieldMapper, disabled, onValueChange],
	);

	return (
		<Stack id={`PureFieldContainer_${id}`} direction={field.orientation ?? 'row'} sx={containerStyleMemo}>
			{/* Label */}
			<FieldLabel {...fieldLabelProps} />
			{/* Value */}
			<FieldValue {...fieldValueProps} buttonBarComponent={buttonBarComponent} fieldComponent={fieldComponent} />
		</Stack>
	);
}

export default React.memo(PureFieldContainer);
