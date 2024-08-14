import React, { CSSProperties } from 'react';

import { TextField } from '../../types/field/text-field.ts';
import classes from '../TextInput/TextInput.module.scss';

interface Props {
	id: string;
	field: TextField;
	value: string;
	onValueChange: (value: number) => void;
	disabled: boolean;
	outerStyle?: CSSProperties;
}

function NumberInput({ id, field, value, onValueChange, disabled, outerStyle }: Props) {
	return (
		<div className={classes.container}>
			{field.prefix && <span>{field.prefix}</span>}
			<input
				id={id}
				style={outerStyle}
				readOnly={field.readOnly}
				disabled={disabled}
				placeholder={field.placeholder}
				className={classes.textInput}
				type="number"
				autoComplete="off"
				maxLength={200}
				value={value}
				onChange={(event) => onValueChange(+event.target.value)}
			/>
			{field.suffix && <span style={{ paddingRight: '4px' }}>{field.suffix}</span>}
		</div>
	);
}

export default NumberInput;
