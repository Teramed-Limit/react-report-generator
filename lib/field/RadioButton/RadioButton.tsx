import React from 'react';

import { Stack } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { codeListAtom } from '../../recoil/atoms/formAtoms.ts';
import { RadioField } from '../../types/field/radio-field.ts';
import classes from '../TextArea/TextArea.module.scss';

interface Props {
	field: RadioField;
	value: string;
	onValueChange: (value: string) => void;
	disabled: boolean;
}

function RadioButton({ field, value, onValueChange, disabled }: Props) {
	const { filterCondition, optionSource, direction } = field;
	const options = useRecoilValue(codeListAtom({ optionSource, filterCondition }));

	const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onValueChange((event.target as HTMLInputElement).value);
	};

	return (
		<Stack direction="row" sx={{ flexWrap: 'wrap' }}>
			{options.map((option) => {
				return (
					<label
						key={option[field.optionSource.key]}
						style={{ display: 'flex', alignItems: 'center', margin: 0 }}
					>
						<input
							type="radio"
							style={{ margin: 0 }}
							disabled={disabled}
							readOnly={field.readOnly}
							value={option[field.optionSource.key]}
							checked={value === option[field.optionSource.key]}
							onChange={handleGenderChange}
						/>
						<span style={{ margin: '0 4px' }} className={classes.textareaInput}>
							{option[field.optionSource.labelKey]}
						</span>
					</label>
				);
			})}
		</Stack>
	);
}

export default RadioButton;
