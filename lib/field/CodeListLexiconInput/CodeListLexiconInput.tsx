import React from 'react';

import { Autocomplete, TextField } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { codeListAtom } from '../../recoil/atoms/formAtoms.ts';
import { LexiconField } from '../../types/field/lexicon-field.ts';

interface Props {
	field: LexiconField;
	value: string;
	onValueChange: (value: string) => void;
	disabled: boolean;
}

function CodeListLexiconInput({ field, value, onValueChange, disabled }: Props) {
	const options = useRecoilValue(
		codeListAtom({
			id: field.id,
			filterCondition: field.filterCondition,
		}),
	);

	return (
		<>
			<Autocomplete
				freeSolo
				id={field.id}
				disableClearable
				options={options}
				getOptionLabel={(option: any) => option[field.optionSource.labelKey]}
				getOptionKey={(option: any) => option[field.optionSource.key]}
				value={value}
				disabled={disabled}
				onChange={(event, newValue: string | null) => {
					onValueChange(newValue);
				}}
				renderInput={(params) => (
					<TextField
						id={params.id}
						disabled={params.disabled}
						fullWidth={params.fullWidth}
						size={params.size}
						InputLabelProps={{ ...params.InputLabelProps }}
						InputProps={{ ...params.InputProps }}
					/>
				)}
			/>
		</>
	);
}

export default CodeListLexiconInput;
