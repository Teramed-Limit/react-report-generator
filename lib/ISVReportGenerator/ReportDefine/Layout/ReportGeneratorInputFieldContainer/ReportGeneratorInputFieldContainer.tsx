import React, { CSSProperties } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Chip, Menu, MenuItem } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { FieldEditMapper } from '../../../../field/field-mapper.tsx';
import { usePopupState } from '../../../../hooks/usePopupState.ts';
import { useReportField } from '../../../../hooks/useReportField.tsx';
import FieldContainer from '../../../../ISVReport/components/FieldContainer/FieldContainer.tsx';
import { fieldGutter, fieldSectionContainer } from '../../../../ISVReport/style.ts';
import { Field } from '../../../../types/field/field.ts';
import FieldsetTemplate from '../FieldsetTemplate/FieldsetTemplate';

interface Props {
	sectionIdx: number;
	subSectionIdx: number;
	field: Field;
	fieldIdx: number;
	showGuideLine: boolean;
}

function ReportGeneratorInputFieldContainer({ field, sectionIdx, subSectionIdx, fieldIdx, showGuideLine }: Props) {
	const { anchorEl, open, handleClick, handleClose } = usePopupState();
	const { isFocus, onSetAttributePath, onDelete, copyField } = useReportField({
		sectionIdx,
		subSectionIdx,
		fieldIdx,
		field,
	});

	return (
		<FieldsetTemplate
			id={`formSectionFieldContainer__${field.id}`}
			style={
				{
					...fieldSectionContainer,
					flexDirection: field.orientation,
					padding: fieldGutter,
					opacity: field?.hide || field?.hideInPDF ? 0.4 : 1,
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
						label={field.id}
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
			<FieldContainer
				key={field.id}
				id={field.id}
				field={field}
				valueChangedId={[field.id]}
				fieldMapper={FieldEditMapper}
			/>
		</FieldsetTemplate>
	);
}

export default React.memo(ReportGeneratorInputFieldContainer);
