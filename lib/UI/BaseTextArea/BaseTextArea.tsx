import { CSSProperties } from 'react';

import { TextareaAutosize } from '@mui/material';

import classes from './BaseTextArea.module.scss';

interface Props {
	id?: string;
	style?: CSSProperties;
	value: string;
	rows?: number;
	placeholder?: string;
	disabled?: boolean;
	maxLength?: number;
	onValueChange: (str: string) => void;
	onFocusChange?: () => void;
	onSelectString?: (str: string) => void;
}

function BaseTextArea({
	id,
	style,
	value = '',
	placeholder = '',
	rows = 4,
	maxLength = 5000,
	disabled = false,
	onValueChange,
	onFocusChange = () => {},
	onSelectString = () => {},
}: Props) {
	const handleChange = (event) => {
		onValueChange(event.target.value.substring(0, maxLength));
	};

	return (
		<TextareaAutosize
			id={id}
			style={{ ...style, padding: '2px' }}
			placeholder={placeholder}
			autoComplete="off"
			disabled={disabled}
			className={classes.textareaInput}
			maxLength={maxLength}
			tabIndex={0}
			minRows={rows}
			value={value}
			onSelect={(event: any) => {
				const selectionTxt = event.target?.value?.substring(
					event.target.selectionStart,
					event.target.selectionEnd,
				);
				onSelectString?.(selectionTxt);
			}}
			onClick={(event) => event.stopPropagation()}
			onChange={handleChange}
			onFocus={() => (onFocusChange ? onFocusChange() : null)}
		/>
	);
}

export default BaseTextArea;
