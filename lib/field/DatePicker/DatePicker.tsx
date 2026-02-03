import { useEffect } from 'react';

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
	// HTML date input requires yyyy-MM-dd format
	const inputValue = dateValue ? dateFormatString(dateValue, 'yyyy-MM-dd') : '';

	const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputDate = e.target.value;
		if (inputDate) {
			const parsedDate = new Date(inputDate);
			onValueChange(dateFormatString(parsedDate, defaultFromFormat));
		} else {
			onValueChange('');
		}
	};

	return (
		<div className={classes.container}>
			{prefix && <span>{prefix}</span>}
			<input
				id={id}
				type="date"
				className={classes.dateInput}
				value={inputValue}
				onChange={onDateChange}
				disabled={disabled}
				readOnly={field.readOnly}
			/>
			{suffix && <span>{suffix}</span>}
		</div>
	);
}

export default DatePicker;
