import React from 'react';

import { Box, Button, Stack, TextareaAutosize } from '@mui/material';
import { ColDef } from 'ag-grid-community';

import CustomModal from '../../../../../modals/CustomModal/CustomModal.tsx';

interface Props {
	value: ColDef[];
	onValueChange: (val: ColDef[]) => void;
}

function ColDefEditor({ value, onValueChange }: Props) {
	const [open, setOpen] = React.useState(false);
	const [colDefsStr, setColDefsStr] = React.useState(JSON.stringify(value, null, 2));

	return (
		<>
			<Stack>
				<Button
					variant="contained"
					onClick={() => {
						setOpen(true);
					}}
				>
					Edit
				</Button>
			</Stack>
			<CustomModal open={open} width="fit-content" height="fit-content" label="Row Definition Editor">
				<Box sx={{ p: 2 }}>
					<TextareaAutosize
						defaultValue={colDefsStr}
						onChange={(event) => {
							setColDefsStr(event.target.value);
						}}
					/>
				</Box>
				<Box>
					<Button
						variant="outlined"
						color="error"
						onClick={() => {
							setOpen(false);
						}}
					>
						Close
					</Button>
					<Button
						variant="contained"
						onClick={() => {
							// Check if the new value is valid JSON
							try {
								const formattedString = colDefsStr
									.replace(/'/g, '"') // 將所有單引號替換為雙引號
									.replace(/(\w+):/g, '"$1":') // 將所有未加引號的鍵加上引號
									.trim();
								const newColDefs = JSON.parse(formattedString);

								if (
									Array.isArray(newColDefs) &&
									newColDefs.every((colDef) => typeof colDef === 'object')
								) {
									onValueChange(newColDefs);
									setOpen(false);
								}
							} catch (e) {
								// setNotification(MessageType.Error, 'Invalid JSON');
							}
						}}
					>
						Confirm
					</Button>
				</Box>
			</CustomModal>
		</>
	);
}

export default ColDefEditor;
