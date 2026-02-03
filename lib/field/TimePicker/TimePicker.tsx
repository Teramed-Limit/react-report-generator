import { DateField } from '../../types/field/date-field.ts';
import { dateFormatString, stringFormatDate } from '../../utils/general.ts';

import classes from './TimePicker.module.scss';

interface Props {
	id: string;
	field: DateField;
	value: string;
	onValueChange: (value: string) => void;
	disabled: boolean;
	suffix?: string;
	prefix?: string;
}

function TimePicker({ id, field, value, onValueChange, disabled, suffix, prefix }: Props) {
	const dateValue = stringFormatDate(value, field.fromFormat || 'HH:mm:ss');
	// HTML time input requires HH:mm format
	const inputValue = dateValue ? dateFormatString(dateValue, 'HH:mm') : '';

	const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputTime = e.target.value;
		if (inputTime) {
			// Create a date object with today's date and the selected time
			const [hours, minutes] = inputTime.split(':').map(Number);
			const date = new Date();
			date.setHours(hours, minutes, 0, 0);
			onValueChange(dateFormatString(date, field.fromFormat || 'HH:mm:ss'));
		} else {
			onValueChange('');
		}
	};

	return (
		<div className={classes.container}>
			{prefix && <span>{prefix}</span>}
			<input
				id={id}
				type="time"
				className={classes.timeInput}
				value={inputValue}
				onChange={onTimeChange}
				disabled={disabled}
				readOnly={field.readOnly}
			/>
			{suffix && <span>{suffix}</span>}
		</div>
	);
}

export default TimePicker;
