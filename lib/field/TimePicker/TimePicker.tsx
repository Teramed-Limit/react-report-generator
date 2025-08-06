import React from 'react';

import { LocalizationProvider, TimePicker as MuiTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { DateField } from '../../types/field/date-field.ts';
import { dateFormatString, stringFormatDate } from '../../utils/general.ts';

import classes from './TimePicker.module.scss';

interface Props {
	field: DateField;
	value: string;
	onValueChange: (value: string) => void;
	disabled: boolean;
	suffix?: string;
	prefix?: string;
}

function TimePicker({ field, value, onValueChange, disabled, suffix, prefix }: Props) {
	const dateValue = stringFormatDate(value, field.fromFormat || 'HH:mm:ss') || new Date();

	const onDataValueChange = (dateVal: Date) => {
		onValueChange(dateFormatString(dateVal, field.fromFormat || 'HH:mm:ss'));
	};

	return (
		// <ThemeProvider theme={newTheme}>
		<div className={classes.container}>
			<span>{prefix}</span>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<MuiTimePicker
					sx={{
						width: '100%',
						'& .MuiInputBase-root': {
							fieldset: {
								border: 'none',
							},
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
							padding: '2px',
							svg: {
								fontSize: '16px',
							},
						},
					}}
					readOnly={field.readOnly}
					format={field.toFormat}
					onChange={onDataValueChange}
					value={dateValue}
					disabled={disabled}
				/>
			</LocalizationProvider>
			<span>{suffix}</span>
		</div>
		// </ThemeProvider>
	);
}

export default TimePicker;
