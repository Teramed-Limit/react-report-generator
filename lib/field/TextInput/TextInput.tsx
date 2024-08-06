import React, { CSSProperties } from 'react';

import { Field } from '../../types/field/field.ts';
import classes from './TextInput.module.scss';

interface Props {
	field: Field;
	value: string;
	onValueChange: (value: string) => void;
	disabled: boolean;
	outerStyle?: CSSProperties;
}

function TextInput({ field, value, onValueChange, disabled, outerStyle }: Props) {
	return (
		<div className={classes.container}>
			<span>{field.prefix}</span>
			<input
				id={field.id}
				style={outerStyle}
				readOnly={field.readOnly}
				disabled={disabled}
				className={classes.textInput}
				type="text"
				autoComplete="off"
				maxLength={200}
				value={value}
				onChange={(event) => onValueChange(event.target.value)}
			/>
			<span>{field.suffix}</span>
		</div>
	);
}

export default TextInput;
