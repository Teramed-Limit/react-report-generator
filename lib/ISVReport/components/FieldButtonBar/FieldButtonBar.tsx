import React from 'react';

import { Button, Stack } from '@mui/material';
import { useRecoilCallback } from 'recoil';

import { buttonActionMapAtom } from '../../../recoil/atoms/formDataAtoms.ts';
import { ButtonMeta, Field } from '../../../types/field/field.ts';
import { fieldButtonBar } from '../../style.ts';

interface Props {
	field: Field;
	modifiable: boolean;
}

function FieldButtonBar({ field, modifiable }: Props) {
	const executeAction = useRecoilCallback(({ snapshot }) => (buttonMeta: ButtonMeta) => {
		const buttonActionMap = snapshot.getLoadable(buttonActionMapAtom).contents;
		const actionMethod = buttonActionMap[buttonMeta.id];
		if (!actionMethod) return console.error(`Action method not found for button id: ${buttonMeta}`);
		actionMethod(field);
	});

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
								onClick={() => executeAction(buttonMeta)}
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
