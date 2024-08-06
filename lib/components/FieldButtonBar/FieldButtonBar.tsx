import React from 'react';

import { Button, Stack } from '@mui/material';

import { Field } from '../../types/field/field.ts';
import { fieldButtonBar } from '../ISVReport/style.ts';

interface Props {
	field: Field;
	modifiable: boolean;
}

function FieldButtonBar({ field, modifiable }: Props) {
	return (
		<>
			{field.buttonBar && (
				<Stack
					direction="row"
					spacing="2px"
					sx={{ ...fieldButtonBar, textTransform: 'none', justifyContent: 'end' }}
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
