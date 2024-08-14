import React, { CSSProperties, useState } from 'react';

import { Box, Stack, Tooltip } from '@mui/material';
import cx from 'classnames';

import classes from './FieldValue.module.scss';

interface FormSectionFieldProps {
	id: string;
	valueStyle?: CSSProperties;
	readOnly: boolean;
	isDirty: boolean;
	isValid: boolean;
	errorMessage: string;
	disabled: boolean;
	noBorder: boolean;
	noPadding: boolean;
	noHover: boolean;
	buttonBarComponent?: React.JSX.Element;
	fieldComponent: React.JSX.Element;
}

function FieldValue({
	id,
	readOnly = false,
	isDirty = false,
	isValid = true,
	errorMessage = '',
	disabled = false,
	noBorder = false,
	noPadding = false,
	noHover = false,
	buttonBarComponent = null,
	fieldComponent,
	valueStyle = {},
}: FormSectionFieldProps) {
	const [hover, setHover] = useState(false);

	return (
		<Stack direction="column" sx={{ ...valueStyle }}>
			<Tooltip title={errorMessage} arrow open={hover && isDirty && !isValid}>
				<Box
					className={cx(classes[`input-field-container`], {
						[classes.readonly]: readOnly,
						[classes.noBorder]: noBorder,
						[classes.invalid]: isDirty && !isValid,
						[classes.disabled]: disabled,
					})}
					sx={{
						'&:hover': {
							borderColor: noHover ? 'none' : 'primary.main',
							backgroundColor: noHover ? 'none' : 'rgba(169, 202, 235, 0.15)',
						},
					}}
					onMouseOver={() => setHover(true)}
					onMouseOut={() => setHover(false)}
					onFocus={() => 0}
					onBlur={() => 0}
				>
					<div
						id={`formSectionField__${id}`}
						className={cx(classes[`field-base`], {
							[classes.noPadding]: noPadding,
						})}
					>
						{fieldComponent}
					</div>
				</Box>
			</Tooltip>
			{buttonBarComponent}
		</Stack>
	);
}

export default FieldValue;
