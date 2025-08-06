import React, { useEffect } from 'react';

import { TextareaAutosize } from '@mui/material';

import { TextareaField } from '../../types/field/textarea-field.ts';
import { isEmptyOrNil } from '../../utils/general.ts';

import classes from './TextArea.module.scss';

interface Props {
	id: string;
	field: TextareaField;
	value: string;
	onValueChange: (value: string) => void;
	disabled: boolean;
}

function TextArea({ id, field, value, onValueChange, disabled }: Props) {
	useEffect(() => {
		if (isEmptyOrNil(value) && !isEmptyOrNil(field.defaultValue)) {
			onValueChange(field.defaultValue);
		}
	}, [field.defaultValue, onValueChange, value]);

	return (
		<TextareaAutosize
			id={id}
			readOnly={field.readOnly}
			placeholder={field.placeholder || ''}
			autoComplete="off"
			disabled={disabled}
			className={classes.textareaInput}
			tabIndex={0}
			minRows={field.rows}
			value={value}
			onClick={(event) => event.stopPropagation()}
			onChange={(event) => onValueChange(event.target.value)}
		/>
	);
}

export default TextArea;
