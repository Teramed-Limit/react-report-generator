import { Autocomplete, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useRecoilValue } from 'recoil';

import { codeListAtom } from '../../recoil/atoms/codeListAtom.ts';
import { LexiconField } from '../../types/field/lexicon-field.ts';

interface Props {
	id: string;
	field: LexiconField;
	value: string;
	onValueChange: (value: string) => void;
	disabled: boolean;
}

function CodeListLexiconInput({ id, field, value, onValueChange, disabled }: Props) {
	const options = useRecoilValue(
		codeListAtom({
			optionSource: field.optionSource,
			filterCondition: field.filterCondition,
		}),
	);

	const labelKey = field.optionSource.labelKey || 'label';
	const valueKey = field.optionSource.key || 'value';

	let defaultValue = null;
	defaultValue = options.find((option) => option[valueKey] === value);
	if (!defaultValue) defaultValue = null;

	return (
		<Autocomplete
			id={id}
			sx={{ height: '100%', width: '100%', p: 0 }}
			freeSolo
			disablePortal
			value={defaultValue}
			inputValue={value ?? ''}
			options={options}
			disabled={disabled}
			getOptionLabel={(option: any) => option[labelKey]}
			getOptionKey={(option: any) => option.id}
			onInputChange={(event, newValue: any) => {
				onValueChange(newValue);
			}}
			onChange={(event, newValue: any) => {
				if (!newValue) {
					onValueChange('');
					return;
				}
				onValueChange(newValue[valueKey]);
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
						// InputProps={{
						// 	endAdornment: (
						// 		<InputAdornment sx={{ p: 0 }} position="end">
						// 			<ImportContactsIcon fontSize="small" />
						// 		</InputAdornment>
						// 	),
						// }}
						sx={{
							width: '100%',
							fieldset: {
								display: 'none',
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
								padding: '0 !important',
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
