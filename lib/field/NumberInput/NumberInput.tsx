import React, { CSSProperties } from 'react';

import { Field } from '../../types/field/field.ts';
import classes from '../TextInput/TextInput.module.scss';

interface Props {
	field: Field;
	value: string;
	onValueChange: (value: number) => void;
	disabled: boolean;
	outerStyle?: CSSProperties;
}

function NumberInput({ field, value, onValueChange, disabled, outerStyle }: Props) {
	return (
		<div className={classes.container}>
			<span>{field.prefix}</span>
			<input
				id={field.id}
				style={outerStyle}
				readOnly={field.readOnly}
				disabled={disabled}
				className={classes.textInput}
				type="number"
				autoComplete="off"
				maxLength={200}
				value={value}
				onChange={(event) => onValueChange(+event.target.value)}
			/>
			<span>{field.suffix}</span>
		</div>
	);
}

export default NumberInput;
