import React from 'react';

import classes from './BaseTextInput.module.scss';

interface Props {
	id?: string;
	value: string;
	disabled?: boolean;
	placeholder?: string;
	onValueChange: (str: string) => void;
	suffix?: string;
	prefix?: string;
	customClass?: string;
}

function BaseTextInput({
	id,
	value = '',
	disabled = false,
	placeholder = '',
	onValueChange,
	suffix = '',
	prefix = '',
	customClass,
}: Props) {
	return (
		<div className={classes.container}>
			<span className={classes.span}>{prefix}&nbsp;</span>
			<input
				autoComplete="off"
				id={id}
				placeholder={placeholder}
				disabled={disabled}
				className={customClass || classes[`text-input`]}
				type="text"
				tabIndex={0}
				maxLength={200}
				value={value}
				onChange={(event) => onValueChange(event.target.value)}
			/>
			<span className={classes.span}>&nbsp;{suffix}</span>
		</div>
	);
}

export default BaseTextInput;
