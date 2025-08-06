import React, { useEffect } from 'react';

import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { DateField } from '../../types/field/date-field.ts';
import { dateFormatString, isEmptyOrNil, stringFormatDate } from '../../utils/general.ts';

import classes from './DatePicker.module.scss';

interface Props {
	id: string;
	field: DateField;
	value: string;
	onValueChange: (value: string) => void;
	disabled: boolean;
	suffix?: string;
	prefix?: string;
}

function DatePicker({ id, field, value, onValueChange, disabled, suffix, prefix }: Props) {
	const defaultToFormat = field.toFormat || 'yyyy-MM-dd';
	const defaultFromFormat = field.fromFormat || 'yyyy-MM-dd';

	// Set default value
	useEffect(() => {
		if (field?.defaultToday && isEmptyOrNil(value)) {
			onValueChange(dateFormatString(new Date(), defaultToFormat));
		}
	}, [defaultToFormat, field?.defaultToday, onValueChange, value]);

	const dateValue = stringFormatDate(value, defaultFromFormat);

	const onDataValueChange = (dateVal: Date) => {
		onValueChange(dateFormatString(dateVal, defaultFromFormat));
	};

	return (
		<div className={classes.container}>
			<span>{prefix}</span>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DesktopDatePicker
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
					format={defaultToFormat}
					value={dateValue}
					disabled={disabled}
					onChange={(v: Date) => onDataValueChange(v)}
				/>
			</LocalizationProvider>
			<span>{suffix}</span>
		</div>
	);
}

export default DatePicker;
