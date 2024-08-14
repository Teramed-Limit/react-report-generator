import React from 'react';

import { Stack } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { codeListAtom } from '../../recoil/atoms/formAtoms.ts';
import { RadioField } from '../../types/field/radio-field.ts';
import classes from '../TextArea/TextArea.module.scss';

interface Props {
	id: string;
	field: RadioField;
	value: string;
	onValueChange: (value: string) => void;
	disabled: boolean;
}

function RadioButton({ id, field, value, onValueChange, disabled }: Props) {
	const { filterCondition, optionSource, direction } = field;
	const options = useRecoilValue(codeListAtom({ optionSource, filterCondition }));

	const labelKey = field.optionSource.labelKey || 'Label';
	const valueKey = field.optionSource.key || 'Value';

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation();
		event.preventDefault();
		onValueChange((event.target as HTMLInputElement).value);
	};

	return (
		<Stack direction="row" sx={{ flexWrap: 'wrap' }}>
			{options.map((option) => {
				return (
					<label key={option[valueKey]} style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
						<input
							type="radio"
							style={{ margin: 0 }}
							disabled={disabled}
							readOnly={field.readOnly}
							value={option[valueKey]}
							checked={value === option[valueKey]}
							onChange={handleChange}
						/>
						<span style={{ margin: '0 4px' }} className={classes.textareaInput}>
							{option[labelKey]}
						</span>
					</label>
				);
			})}
		</Stack>
	);
}

export default RadioButton;
