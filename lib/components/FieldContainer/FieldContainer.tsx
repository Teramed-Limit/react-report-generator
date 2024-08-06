import React, { CSSProperties } from 'react';

import { Stack } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';

import { FieldMapper } from '../../field/field-mapper.tsx';
import { noBorderField, noHoverField, noLabelField } from '../../field/field-type.ts';
import { formDisabledAtom, stateAtom, valueAtom } from '../../recoil/atoms/formAtoms.ts';
import { Field } from '../../types/field/field.ts';
import { ValidateType } from '../../types/validate.ts';
import FieldButtonBar from '../FieldButtonBar/FieldButtonBar.tsx';
import FieldDynamicRenderer from '../FieldDynamicRenderer/FieldDynamicRenderer.tsx';
import FieldLabel from '../FieldLabel/FieldLabel.tsx';
import FieldValue from '../FieldValue/FieldValue.tsx';
import { fieldSectionContainer } from '../ISVReport/style.ts';

interface Props {
	field: Field;
	fieldMapper?: { [key: string]: React.ComponentType<any> };
	customValue?: any;
	customValueChange?: (id: string, text: string) => void;
	customValueGetter?: (id: string) => string;
	prefixComp?: React.JSX.Element;
	suffixComp?: React.JSX.Element;
}

function FieldContainer({
	field,
	fieldMapper = FieldMapper,
	customValue,
	customValueChange,
	customValueGetter,
	prefixComp,
	suffixComp,
}: Props) {
	const formDisabled = useRecoilValue(formDisabledAtom);
	const [value, setValue] = useRecoilState(valueAtom(field));
	const formStates = useRecoilValue(stateAtom(field));
	const onValueChange = (text: any) => {
		setValue(text);
	};

	return (
		<Stack
			id={`FieldContainer__${field.id}`}
			direction={field.orientation ?? 'row'}
			sx={{ ...fieldSectionContainer }}
		>
			{/* Label */}
			<FieldLabel
				id={field.id}
				label={field.label}
				labelStyle={{
					...field.labelStyle,
					flex: `0 0 ${field.labelWidth || '35%'}`,
					// maxWidth: field.labelWidth || '35%',
					lineHeight: 1.5,
				}}
				hint={field.hint}
				hideLabelSection={field.hideLabel || noLabelField[field.type]}
				hasValidation={field.validate !== undefined && field.validate?.type !== ValidateType.None}
				prefixComp={prefixComp}
				suffixComp={suffixComp}
			/>
			{/* Value */}
			<FieldValue
				id={field.id}
				readOnly={!!field.readOnly}
				isDirty={formStates?.isDirty}
				isValid={formStates?.isValid}
				errorMessage={formStates?.errorMessage}
				disabled={formDisabled}
				noBorder={noBorderField[field.type]}
				noHover={noHoverField[field.type]}
				valueStyle={{
					...(field.valueStyle as CSSProperties),
					flex: `1 1 auto`,
					maxWidth: '100%',
					height: '100%',
					lineHeight: 1.5,
				}}
				buttonBarComponent={<FieldButtonBar field={field} modifiable={!formDisabled} />}
				fieldComponent={
					<FieldDynamicRenderer
						field={field}
						value={value}
						fieldMapper={fieldMapper}
						modifiable={!formDisabled}
						onValueChange={onValueChange}
					/>
				}
			/>
		</Stack>
	);
}

export default FieldContainer;
