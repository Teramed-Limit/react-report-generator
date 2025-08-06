import React, { CSSProperties, useCallback, useMemo } from 'react';

import { Stack } from '@mui/material';
import * as R from 'ramda';
import { useRecoilTransaction_UNSTABLE, useRecoilValue } from 'recoil';

import { FieldMapper } from '../../../field/field-mapper.tsx';
import { noBorderField, noHoverField, noLabelField, noPaddingField } from '../../../field/field-type.ts';
import {
	formDisabledAtom,
	formStatesAtom,
	formValuesAtom,
	stateAtom,
	valueAtom,
} from '../../../recoil/atoms/formDataAtoms.ts';
import { ValidationService } from '../../../service/validation/validation-service.ts';
import { ReportDataService } from '../../../service/valueChangedEvent/report-data-service.ts';
import { Field } from '../../../types/field/field.ts';
import { ValidateType } from '../../../types/validate.ts';
import { styleConverter } from '../../../utils/style-converter.ts';
import { fieldSectionContainer } from '../../style.ts';
import FieldButtonBar from '../FieldButtonBar/FieldButtonBar.tsx';
import FieldDynamicRenderer from '../FieldDynamicRenderer/FieldDynamicRenderer.tsx';
import FieldLabel from '../FieldLabel/FieldLabel.tsx';
import FieldValue from '../FieldValue/FieldValue.tsx';

interface Props {
	id: string;
	field: Field;
	valueChangedId: (string | number)[];
	fieldMapper?: { [key: string]: React.ComponentType<any> };
	containerStyle?: CSSProperties;
	prefixComp?: React.JSX.Element;
	suffixComp?: React.JSX.Element;
}

const validationServiceInstance = new ValidationService();
const reportDataServiceInstance = new ReportDataService();

function FieldContainer({
	id,
	field,
	valueChangedId,
	fieldMapper = FieldMapper,
	containerStyle,
	prefixComp,
	suffixComp,
}: Props) {
	const isFormDisabled = useRecoilValue(formDisabledAtom);
	const fieldValue = useRecoilValue(valueAtom(valueChangedId));
	const fieldStates = useRecoilValue(stateAtom(valueChangedId));

	// 使用 useRecoilTransaction_UNSTABLE 記憶化批量狀態更新
	const handleValueChange = useRecoilTransaction_UNSTABLE(({ get, set }) => (newFieldValue: any) => {
		// eslint-disable-next-line @typescript-eslint/no-shadow
		const updateFormStatesAndValues = (id: (string | number)[], updatedValue: any) => {
			const currentFormValues = get(formValuesAtom);
			const updatedFormValues = R.assocPath(id, updatedValue, currentFormValues);
			set(formValuesAtom, updatedFormValues);

			const currentFormStates = get(formStatesAtom);
			const updatedFormStates = R.assocPath(
				id,
				{
					isDirty: true,
					...validationServiceInstance.validate(updatedValue, field.validate, currentFormStates),
				},
				currentFormStates,
			);
			set(formStatesAtom, updatedFormStates);
		};

		const currentFormValues = get(formValuesAtom);
		const newFormValues = R.assocPath(valueChangedId, newFieldValue, currentFormValues);
		set(formValuesAtom, newFormValues);

		if (field.valueChangedEvent) {
			reportDataServiceInstance.postValueChangedByAction(
				{ field, valueChangedId, value: newFieldValue },
				updateFormStatesAndValues,
			);
		}

		updateFormStatesAndValues(valueChangedId, newFieldValue);
	});

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
			isDirty: fieldStates?.isDirty,
			isValid: fieldStates?.isValid,
			errorMessage: fieldStates?.errorMessage,
			disabled: isFormDisabled,
			noBorder: noBorderField[field.type],
			noHover: noHoverField[field.type],
			noPadding: noPaddingField[field.type],
			valueStyle: valueStyleMemo,
		}),
		[
			id,
			field.readOnly,
			field.type,
			fieldStates?.isDirty,
			fieldStates?.isValid,
			fieldStates?.errorMessage,
			isFormDisabled,
			valueStyleMemo,
		],
	);

	const buttonBarComponent = useMemo(
		() => <FieldButtonBar field={field} modifiable={!isFormDisabled} />,
		[field, isFormDisabled],
	);

	const fieldComponent = useMemo(
		() => (
			<FieldDynamicRenderer
				id={id}
				field={field}
				value={fieldValue}
				fieldMapper={fieldMapper}
				modifiable={!isFormDisabled}
				onValueChange={handleValueChange}
			/>
		),
		[id, field, fieldValue, fieldMapper, isFormDisabled, handleValueChange],
	);

	return (
		<Stack id={`FieldContainer_${id}`} direction={field.orientation ?? 'row'} sx={containerStyleMemo}>
			{/* Label */}
			<FieldLabel {...fieldLabelProps} />
			{/* Value */}
			<FieldValue {...fieldValueProps} buttonBarComponent={buttonBarComponent} fieldComponent={fieldComponent} />
		</Stack>
	);
}

// 使用自定義比較函數的 React.memo，確保只有真正需要更新的情況下才重新渲染
export default React.memo(FieldContainer, (prevProps, nextProps) => {
	// 比較基本屬性
	if (
		prevProps.id !== nextProps.id ||
		JSON.stringify(prevProps.valueChangedId) !== JSON.stringify(nextProps.valueChangedId) ||
		prevProps.fieldMapper !== nextProps.fieldMapper ||
		JSON.stringify(prevProps.containerStyle) !== JSON.stringify(nextProps.containerStyle) ||
		prevProps.prefixComp !== nextProps.prefixComp ||
		prevProps.suffixComp !== nextProps.suffixComp
	) {
		return false;
	}

	// 比較 field 的關鍵屬性
	const prevField = prevProps.field;
	const nextField = nextProps.field;

	if (
		prevField.id !== nextField.id ||
		prevField.type !== nextField.type ||
		prevField.label !== nextField.label ||
		prevField.readOnly !== nextField.readOnly ||
		prevField.hideLabel !== nextField.hideLabel ||
		prevField.orientation !== nextField.orientation ||
		prevField.labelWidth !== nextField.labelWidth ||
		JSON.stringify(prevField.labelStyle) !== JSON.stringify(nextField.labelStyle) ||
		JSON.stringify(prevField.valueStyle) !== JSON.stringify(nextField.valueStyle) ||
		JSON.stringify(prevField.validate) !== JSON.stringify(nextField.validate) ||
		JSON.stringify(prevField.valueChangedEvent) !== JSON.stringify(nextField.valueChangedEvent)
	) {
		return false;
	}

	// 所有關鍵屬性都相同，不需要重新渲染
	return true;
});
