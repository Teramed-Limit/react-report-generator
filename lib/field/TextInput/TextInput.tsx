import { CSSProperties, useEffect } from 'react';

import { TextField } from '../../types/field/text-field.ts';
import { isEmptyOrNil } from '../../utils/general.ts';

import classes from './TextInput.module.scss';

interface Props {
	id: string;
	field: TextField;
	value: string;
	onValueChange: (value: string) => void;
	disabled: boolean;
	outerStyle?: CSSProperties;
}

function TextInput({ id, field, value, onValueChange, disabled, outerStyle }: Props) {
	useEffect(() => {
		if (isEmptyOrNil(value) && !isEmptyOrNil(field.defaultValue)) {
			onValueChange(field.defaultValue);
		}
	}, [field.defaultValue, onValueChange, value]);

	return (
		<div className={classes.container}>
			{field.prefix && <span>{field.prefix}</span>}
			<input
				id={id}
				style={outerStyle}
				readOnly={field.readOnly}
				disabled={disabled}
				className={classes.textInput}
				placeholder={field.placeholder}
				type="text"
				autoComplete="off"
				maxLength={200}
				value={value}
				onChange={(event) => onValueChange(event.target.value)}
			/>
			{field.suffix && <span style={{ paddingRight: '4px' }}>{field.suffix}</span>}
		</div>
	);
}

export default TextInput;
