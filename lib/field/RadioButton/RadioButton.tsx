import React from 'react';

import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { codeListAtom } from '../../recoil/atoms/formAtoms.ts';
import { RadioField } from '../../types/field/radio-field.ts';

interface Props {
	field: RadioField;
	value: string;
	onValueChange: (value: string) => void;
	disabled: boolean;
}

function RadioButton({ field, value, onValueChange, disabled }: Props) {
	const options = useRecoilValue(
		codeListAtom({
			id: field.id,
			filterCondition: field.filterCondition,
		}),
	);

	const onSelectChange = (event: React.ChangeEvent<HTMLInputElement>, selection: string) => {
		onValueChange(selection);
	};

	return (
		<RadioGroup row id={field.id} value={value} onChange={onSelectChange}>
			{options.map((option) => {
				return (
					<FormControlLabel
						key={option.Id}
						disabled={disabled}
						value={option}
						control={<Radio />}
						label={field.label}
						labelPlacement="end"
					/>
				);
			})}
		</RadioGroup>
	);
}

export default RadioButton;
