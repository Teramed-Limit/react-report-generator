import React from 'react';

import { TextareaAutosize } from '@mui/material';

import { TextareaField } from '../../types/field/textarea-field.ts';
import classes from './TextArea.module.scss';

interface Props {
	field: TextareaField;
	value: string;
	onValueChange: (value: string) => void;
	disabled: boolean;
}

function TextArea({ field, value, onValueChange, disabled }: Props) {
	return (
		<TextareaAutosize
			id={field.id}
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
