import React, { CSSProperties } from 'react';

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

	return (
		<Stack
			id={`FieldContainer_${id}`}
			direction={field.orientation ?? 'row'}
			sx={{ ...fieldSectionContainer, ...containerStyle }}
		>
			{/* Label */}
			<FieldLabel
				id={id}
				label={field.label}
				labelStyle={{
					display: 'flex',
					flex: `0 0 ${field.labelWidth || '35%'}`,
					maxWidth: field.labelWidth || '35%',
					lineHeight: 1.5,
					...(field.labelStyle as CSSProperties),
					...styleConverter(field.labelStyle as CSSProperties),
				}}
				hint={field.hint}
				hideLabelSection={field.hideLabel || noLabelField[field.type]}
				hasValidation={field.validate !== undefined && field.validate?.type !== ValidateType.None}
				prefixComp={prefixComp}
				suffixComp={suffixComp}
			/>
			{/* Value */}
			<FieldValue
				id={id}
				readOnly={!!field.readOnly}
				isDirty={fieldStates?.isDirty}
				isValid={fieldStates?.isValid}
				errorMessage={fieldStates?.errorMessage}
				disabled={isFormDisabled}
				noBorder={noBorderField[field.type]}
				noHover={noHoverField[field.type]}
				noPadding={noPaddingField[field.type]}
				valueStyle={{
					...(field.valueStyle as CSSProperties),
					flex: `1 1 auto`,
					maxWidth: '100%',
					height: '100%',
					lineHeight: 1.5,
					...styleConverter(field.valueStyle as CSSProperties),
				}}
				buttonBarComponent={<FieldButtonBar field={field} modifiable={!isFormDisabled} />}
				fieldComponent={
					<FieldDynamicRenderer
						id={id}
						field={field}
						value={fieldValue}
						fieldMapper={fieldMapper}
						modifiable={!isFormDisabled}
						onValueChange={handleValueChange}
					/>
				}
			/>
		</Stack>
	);
}

export default React.memo(FieldContainer);
