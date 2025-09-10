import React from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Chip, Menu, MenuItem } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { usePopupState } from '../../../../hooks/usePopupState.ts';
import { useReportField } from '../../../../hooks/useReportField.tsx';
import FieldArrayContainer from '../../../../ISVReport/components/FieldArrayContainer/FieldArrayContainer.tsx';
import { fieldGutter } from '../../../../ISVReport/style.ts';
import { ArrayField } from '../../../../types/field/array-field.ts';
import FieldsetTemplate from '../FieldsetTemplate/FieldsetTemplate';

interface Props {
	sectionIdx: number;
	subSectionIdx: number;
	field: ArrayField;
	fieldIdx: number;
	showGuideLine: boolean;
}

function ReportGeneratorInputArrayField({
	field: arrayField,
	sectionIdx,
	subSectionIdx,
	fieldIdx,
	showGuideLine,
}: Props) {
	const { anchorEl, open, handleClick, handleClose } = usePopupState();
	const { isFocus, onSetAttributePath, onDelete, copyField, onDragStart, onDragEnd } = useReportField({
		sectionIdx,
		subSectionIdx,
		fieldIdx,
		field: arrayField,
	});

	return (
		<FieldsetTemplate
			id={`fieldArrayContainer__${arrayField.id}`}
			style={{
				flexDirection: arrayField.orientation,
				padding: fieldGutter,
				opacity: arrayField?.hide || arrayField?.hideInPDF ? 0.4 : 1,
			}}
			showGuideLine={showGuideLine}
			isFocus={isFocus}
			legendComp={
				<>
					<Chip
						sx={{ cursor: 'pointer' }}
						size="small"
						color="success"
						label={arrayField.id}
						onDelete={handleClick}
						deleteIcon={<MoreVertIcon />}
					/>
					<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
						<MenuItem onClick={copyField}>
							<ListItemIcon>
								<ContentCopyIcon fontSize="small" />
							</ListItemIcon>
							<ListItemText>Copy Field</ListItemText>
						</MenuItem>
						<MenuItem onClick={onDelete}>
							<ListItemIcon>
								<DeleteIcon fontSize="small" />
							</ListItemIcon>
							<ListItemText>Delete</ListItemText>
						</MenuItem>
					</Menu>
				</>
			}
			onClick={onSetAttributePath}
			draggable
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		>
			<FieldArrayContainer key={arrayField.id} field={arrayField as ArrayField} />
		</FieldsetTemplate>
	);
}

export default ReportGeneratorInputArrayField;
