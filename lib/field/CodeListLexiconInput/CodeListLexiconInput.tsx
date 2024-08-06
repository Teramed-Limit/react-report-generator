import React from 'react';

import { Autocomplete, Box, TextField } from '@mui/material';
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
			optionSource: field.optionSource,
			filterCondition: field.filterCondition,
		}),
	);

	let defaultValue = null;
	defaultValue = options.find((option) => option[field.optionSource.key] === value);
	if (!defaultValue) defaultValue = null;

	return (
		<Autocomplete
			id={field.id}
			sx={{ height: '100%', width: '100%' }}
			freeSolo
			disablePortal
			value={defaultValue}
			options={options}
			getOptionLabel={(option: any) => option[field.optionSource.labelKey]}
			getOptionKey={(option: any) => option[field.optionSource.key]}
			onChange={(event, newValue: any) => {
				if (!newValue) {
					onValueChange('');
					return;
				}
				onValueChange(newValue[field.optionSource.key]);
			}}
			componentsProps={{ paper: { sx: { width: 'fit-content', minWidth: '100%' } } }}
			renderOption={(props, option, state, ownerState) => {
				const { key, ...optionProps } = props;
				return (
					<Box key={key} component="li" {...optionProps}>
						{ownerState.getOptionLabel(option)}
					</Box>
				);
			}}
			renderInput={(params) => {
				return (
					<TextField
						{...params}
						sx={{
							width: '100%',
							fieldset: {
								display: 'none',
							},
							"& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']": {
								paddingRight: '34px !important',
								'& .MuiAutocomplete-input': {
									padding: 0,
								},
							},
							'& .MuiInputBase-root': {
								fieldset: {
									border: 'none',
								},
								padding: '0',
								height: '100%',
								fontFamily: 'inherit',
								fontSize: 'inherit',
								fontWeight: 'inherit',
								fontStyle: 'inherit',
								fontVariant: 'inherit',
								lineHeight: 'inherit',
								textTransform: 'inherit',
								letterSpacing: 'inherit',
								wordSpacing: 'inherit',
								textIndent: 'inherit',
								textAlign: 'inherit',
								verticalAlign: 'inherit',
								direction: 'inherit',
								textShadow: 'inherit',
								color: 'inherit',
							},
							'& .MuiInputBase-input': {
								padding: 0,
								border: 'none',
								borderRadius: 0,
								height: 'auto',
							},
							'& .MuiButtonBase-root ': {
								display: field.readOnly ? 'none' : 'flex',
								svg: {
									fontSize: '16px',
								},
							},
							'& .MuiAutocomplete-endAdornment': {
								display: 'flex !important',
								flexDirection: 'row',
								right: '4px !important',
							},
						}}
					/>
				);
			}}
		/>
	);
}

export default CodeListLexiconInput;
