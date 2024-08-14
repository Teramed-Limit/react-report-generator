import React from 'react';

import { Button, Stack } from '@mui/material';

import { Field } from '../../../types/field/field.ts';
import { fieldButtonBar } from '../../style.ts';

interface Props {
	field: Field;
	modifiable: boolean;
}

function FieldButtonBar({ field, modifiable }: Props) {
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
							>
								{buttonMeta.label}
							</Button>
						))}
				</Stack>
			)}
		</>
	);
}

export default FieldButtonBar;
