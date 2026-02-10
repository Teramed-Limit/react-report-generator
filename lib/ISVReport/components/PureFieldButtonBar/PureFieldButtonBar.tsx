import React from 'react';

import { Button, Stack } from '@mui/material';

import { ButtonMeta, Field } from '../../../types/field/field.ts';
import { fieldButtonBar } from '../../style.ts';

interface Props {
	field: Field;
	modifiable: boolean;
	onButtonClick?: (buttonId: string, field: Field) => void;
}

function PureFieldButtonBar({ field, modifiable, onButtonClick }: Props) {
	const handleButtonClick = (buttonMeta: ButtonMeta) => {
		if (onButtonClick) {
			onButtonClick(buttonMeta.id, field);
		}
	};

	return (
		<>
			{field?.buttonBar && field?.buttonBar.length > 0 && (
				<Stack
					direction="row"
					spacing="2px"
					sx={{
						...fieldButtonBar,
						justifyContent: 'end',
						marginTop: '2px',
					}}
				>
					{field.buttonBar
						.filter((buttonMeta) => !buttonMeta.hide)
						.map((buttonMeta) => (
							<Button
								key={buttonMeta.id}
								sx={{ textTransform: 'none', justifyContent: 'end' }}
								size="small"
								variant="contained"
								disabled={buttonMeta?.disable && !modifiable}
								onClick={() => handleButtonClick(buttonMeta)}
							>
								{buttonMeta.label}
							</Button>
						))}
				</Stack>
			)}
		</>
	);
}

export default React.memo(PureFieldButtonBar);
