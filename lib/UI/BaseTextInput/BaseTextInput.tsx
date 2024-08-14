import React from 'react';

import classes from './BaseTextInput.module.scss';

interface Props {
	id?: string;
	value: string;
	disabled?: boolean;
	placeholder?: string;
	onValueChange: (str: string) => void;
	onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
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
	onKeyUp,
	onFocus,
	suffix = '',
	prefix = '',
	customClass,
}: Props) {
	return (
		<div className={classes.container}>
			{prefix && <span className={classes.span}>{prefix}&nbsp;</span>}
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
				onKeyUp={onKeyUp}
				onFocus={onFocus}
				onChange={(event) => onValueChange(event.target.value)}
			/>
			{suffix && <span className={classes.span}>{suffix}&nbsp;</span>}
		</div>
	);
}

export default BaseTextInput;
