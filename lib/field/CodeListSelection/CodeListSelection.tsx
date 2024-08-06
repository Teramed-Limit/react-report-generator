import React, { useEffect } from 'react';

import { Autocomplete, Box, TextField } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { codeListAtom } from '../../recoil/atoms/codeListAtom.ts';
import { SelectionField } from '../../types/field/selection-field.ts';

interface SelectionProps {
	id: string;
	field: SelectionField;
	value: string | string[];
	onValueChange: (value: string | string[]) => void;
	disabled: boolean;
}

function CodeListSelection({ id, field, value, onValueChange, disabled }: SelectionProps) {
	const { isMulti, filterCondition, optionSource } = field;
	const options = useRecoilValue(codeListAtom({ optionSource, filterCondition }));

	const labelKey = field.optionSource.labelKey || 'Label';
	const valueKey = field.optionSource.key || 'Value';

	let selectedOption: any = null;
	if (!isMulti) {
		selectedOption = options.find((option) => option[valueKey] === value);
		if (selectedOption === undefined) selectedOption = null;
	}

	if (isMulti) {
		// 拿到的Value是一個數組，裡面是選中的option的key
		selectedOption = options.filter((option) => value?.includes(option[valueKey])) || [];
	}

	// 如果options，都沒有value的話就清掉
	useEffect(() => {
		if (!isMulti && value && !options.some((option) => option[valueKey] === value)) {
			onValueChange('');
		}

		if (
			isMulti &&
			Array.isArray(value) &&
			value.length > 0 &&
			!value.every((val: string) => options.some((option) => option[valueKey] === val))
		) {
			onValueChange([]);
		}
	}, [value, options, isMulti, valueKey, onValueChange]);

	return (
		<Autocomplete
			id={id}
			sx={{ height: '100%', width: '100%' }}
			readOnly={field.readOnly}
			disablePortal
			disabled={disabled}
			multiple={isMulti}
			disableCloseOnSelect={isMulti}
			value={selectedOption}
			isOptionEqualToValue={(option, cmpValue) => {
				if (!cmpValue) return false;
				return option[valueKey] === cmpValue[valueKey];
			}}
			options={options}
			getOptionLabel={(option: any) => option[labelKey]}
			getOptionKey={(option: any) => option[valueKey]}
			onChange={(event, newValue: any) => {
				if (!newValue) {
					onValueChange('');
					return;
				}

				if (isMulti) {
					onValueChange(newValue.map((opt: any) => opt[valueKey]));
				} else {
					onValueChange(newValue[valueKey]);
				}
			}}
			componentsProps={{
				paper: {
					sx: {
						width: 'fit-content',
						whiteSpace: 'nowrap',
						minWidth: '100%',
					},
				},
			}}
			ChipProps={{
				size: 'small',
				sx: {
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
					height: 'auto',
					'& .MuiChip-label': {
						display: 'block',
						whiteSpace: 'normal',
					},
				},
			}}
			renderOption={(props, option, state, ownerState) => {
				const { key, ...optionProps } = props;
				return (
					<Box key={key} component="li" {...optionProps}>
						{ownerState.getOptionLabel(option)}
					</Box>
				);
			}}
			// renderOption={(props, option, { selected }, ownerState) => {
			// 	const { key, ...optionProps } = props;
			// 	return (
			// 		<li key={key} {...optionProps}>
			// 			<Checkbox
			// 				size="small"
			// 				icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
			// 				checkedIcon={<CheckBoxIcon fontSize="small" />}
			// 				checked={selected}
			// 			/>
			// 			{ownerState.getOptionLabel(option)}
			// 		</li>
			// 	);
			// }}
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
								padding: '0 !important',
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
								svg: { fontSize: '16px' },
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
