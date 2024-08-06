import React, { useEffect, useRef } from 'react';

import { Autocomplete, Box, TextField } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { codeListAtom } from '../../recoil/atoms/formAtoms.ts';
import { SelectionField } from '../../types/field/selection-field.ts';
import { coerceArray, isEmptyOrNil } from '../../utils/general.ts';

interface SelectionProps {
	field: SelectionField;
	value: string;
	onValueChange: (value: string) => void;
	disabled: boolean;
}

function CodeListSelection({ field, value, onValueChange, disabled }: SelectionProps) {
	const { isMulti, filterCondition } = field;

	const options = useRecoilValue(
		codeListAtom({
			optionSource: field.optionSource,
			filterCondition: field.filterCondition,
		}),
	);

	const selectedIsNotInOptions = useRef(false);

	useEffect(() => {
		if (selectedIsNotInOptions.current) {
			onValueChange('');
			selectedIsNotInOptions.current = false;
		}
	}, [onValueChange]);

	useEffect(() => {
		if (isEmptyOrNil(value) && options?.length === 1 && !isMulti) {
			onValueChange(options[0].Value);
		}
	}, [isMulti, onValueChange, options, value]);

	let formatValue = coerceArray(value);
	let formatSelectedOption;
	if (onValueChange && options) {
		formatValue = formatValue.map((str) => options.find((option) => option.Value === str));

		// selectedOption does not in options
		formatSelectedOption = isMulti ? formatValue : formatValue[0];
		if (!formatSelectedOption && filterCondition?.filterById) {
			selectedIsNotInOptions.current = true;
		}
	}

	// const setSelectedOption = (option) =>
	// 	onSelectionChanged(isMulti ? option.map((opt: any) => opt.Value) : option.Value);

	return (
		<Autocomplete
			id={field.id}
			sx={{
				height: '100%',
				width: '100%',
			}}
			disablePortal
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
						sx={{
							width: '100%',
							fieldset: {
								display: 'none',
							},
							"& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']": {
								paddingRight: '34px',
								'& .MuiAutocomplete-input': {
									padding: '1px 2px',
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
							},
							'& .MuiInputBase-input': {
								padding: '1px 2px',
								border: 'none',
								borderRadius: 0,
								height: 'auto',
							},
							'& .MuiButtonBase-root ': {
								display: field.readOnly ? 'none' : 'flex',
								padding: '2px',
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
						id={params.id}
						disabled={params.disabled}
						fullWidth={params.fullWidth}
						InputLabelProps={params.InputLabelProps}
						inputProps={params.inputProps}
						InputProps={params.InputProps}
					/>
				);
			}}
			// renderInput={(params) => (
			// 	<div ref={params.InputProps.ref} className={classes.container}>
			// 		{/* <span>{field.prefix}</span> */}
			// 		<input type="text" {...params.inputProps} disabled={disabled} className={classes.textInput} />
			// 		{/* <span>{field.suffix}</span> */}
			// 	</div>
			// )}
		/>
	);
}

export default CodeListSelection;
