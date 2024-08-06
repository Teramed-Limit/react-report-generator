import React, { CSSProperties } from 'react';

import { Stack } from '@mui/material';

import { CompositeField } from '../../../types/field/composite-field.ts';
import { Field } from '../../../types/field/field.ts';
import { styleConverter } from '../../../utils/style-converter.ts';
import { fieldGutter, fieldSectionContainer } from '../../style.ts';
import FieldContainer from '../FieldContainer/FieldContainer.tsx';
import FieldLabel from '../FieldLabel/FieldLabel.tsx';

interface Props {
	id: string;
	field: CompositeField;
	appendValueChangedId?: (string | number)[];
	prefixComp?: React.JSX.Element;
	suffixComp?: React.JSX.Element;
}

function FieldCompositeContainer({ id, field: compositeField, appendValueChangedId, prefixComp, suffixComp }: Props) {
	const hasValidation = compositeField?.fields?.some((innerField) => innerField.validate !== undefined) || false;

	return (
		<Stack
			id={`FieldCompositeContainer_${compositeField.id}`}
			direction={compositeField.orientation ?? 'row'}
			sx={{
				...fieldSectionContainer,
				flexDirection: compositeField.orientation,
				flex: `1 1 auto`,
			}}
		>
			{/* Label */}
			<FieldLabel
				id={compositeField.id}
				label={compositeField.label}
				labelStyle={{
					flex: `0 0 ${compositeField.labelWidth || '35%'}`,
					maxWidth: compositeField.labelWidth || '35%',
					lineHeight: 1.5,
					...(compositeField.labelStyle as CSSProperties),
					...styleConverter(compositeField.labelStyle as CSSProperties),
				}}
				hint={compositeField.hint}
				hideLabelSection={compositeField.hideLabel}
				hasValidation={hasValidation}
				prefixComp={prefixComp}
				suffixComp={suffixComp}
			/>

			{/* Value */}
			<Stack
				direction={compositeField.compositeOrientation}
				spacing={`${fieldGutter * 2}px`}
				sx={{
					flexDirection: compositeField.compositeOrientation,
					flex: `1 1 auto`,
					maxWidth:
						compositeField.orientation === 'column'
							? '100%'
							: `calc(100% - ${compositeField.labelWidth || '35%'})`,
				}}
			>
				{compositeField.fields.map((innerField: Field, idx) => {
					let compositeValueChangedId: (string | number)[] = [innerField.id];
					if (appendValueChangedId) {
						compositeValueChangedId = [...appendValueChangedId, innerField.id];
					}

					let distribution = compositeField.flexDistribution;
					if (!distribution) distribution = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

					return (
						<FieldContainer
							key={innerField.id}
							id={`${id}_${innerField.id}`}
							containerStyle={{
								padding: 0,
								flex: distribution[idx],
							}}
							field={{ ...innerField, hideLabel: true }}
							valueChangedId={compositeValueChangedId}
						/>
					);
				})}
			</Stack>
		</Stack>
	);
}

export default FieldCompositeContainer;
