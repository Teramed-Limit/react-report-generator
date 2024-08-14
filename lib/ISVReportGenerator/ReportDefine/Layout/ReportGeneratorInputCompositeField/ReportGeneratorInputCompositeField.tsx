import React, { CSSProperties } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Chip, Menu, MenuItem } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { usePopupState } from '../../../../hooks/usePopupState.ts';
import { useReportField } from '../../../../hooks/useReportField.tsx';
import FieldCompositeContainer from '../../../../ISVReport/components/FieldCompositeContainer/FieldCompositeContainer.tsx';
import { fieldGutter, fieldSectionContainer } from '../../../../ISVReport/style.ts';
import { CompositeField } from '../../../../types/field/composite-field.ts';
import FieldsetTemplate from '../FieldsetTemplate/FieldsetTemplate';

interface Props {
	sectionIdx: number;
	subSectionIdx: number;
	field: CompositeField;
	fieldIdx: number;
	showGuideLine: boolean;
}

function ReportGeneratorInputCompositeField({
	field: compositeField,
	sectionIdx,
	subSectionIdx,
	fieldIdx,
	showGuideLine,
}: Props) {
	const { anchorEl, open, handleClick, handleClose } = usePopupState();
	const { isFocus, onSetAttributePath, onDelete, copyField } = useReportField({
		sectionIdx,
		subSectionIdx,
		fieldIdx,
		field: compositeField,
	});

	return (
		<FieldsetTemplate
			id={`formSectionCompositeContainer__${compositeField.id}`}
			style={
				{
					...fieldSectionContainer,
					flexDirection: compositeField.orientation,
					padding: fieldGutter,
					opacity: compositeField?.hide || compositeField?.hideInPDF ? 0.4 : 1,
				} as CSSProperties
			}
			showGuideLine={showGuideLine}
			isFocus={isFocus}
			legendComp={
				<>
					<Chip
						sx={{ cursor: 'pointer' }}
						size="small"
						color="success"
						label={compositeField.id}
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
		>
			<FieldCompositeContainer
				key={compositeField.id}
				id={compositeField.id}
				field={compositeField as CompositeField}
			/>
		</FieldsetTemplate>
	);
}

export default ReportGeneratorInputCompositeField;
