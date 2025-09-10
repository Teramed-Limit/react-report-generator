import { CSSProperties } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Chip, Menu, MenuItem } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { usePopupState } from '../../../../hooks/usePopupState';
import { useReportField } from '../../../../hooks/useReportField';
import FieldParagraphContainer from '../../../../ISVReport/components/FieldParagraphContainer/FieldParagraphContainer';
import { fieldGutter, fieldSectionContainer } from '../../../../ISVReport/style';
import { ParagraphField } from '../../../../types/field/paragraph-field';
import FieldsetTemplate from '../FieldsetTemplate/FieldsetTemplate';

interface Props {
	sectionIdx: number;
	subSectionIdx: number;
	fieldIdx: number;
	field: ParagraphField;
	showGuideLine: boolean;
}

function ReportGeneratorInputParagraphField({ field, showGuideLine, sectionIdx, subSectionIdx, fieldIdx }: Props) {
	const { anchorEl, open, handleClick, handleClose } = usePopupState();
	const { isFocus, onSetAttributePath, onDelete, copyField, onDragStart, onDragEnd } = useReportField({
		sectionIdx,
		subSectionIdx,
		fieldIdx,
		field,
	});

	return (
		<FieldsetTemplate
			id={`fieldSectionContainer__${field.id}`}
			style={
				{
					...fieldSectionContainer,
					flexDirection: 'row',
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
			draggable
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		>
			<FieldParagraphContainer id={field.id} field={field} />
		</FieldsetTemplate>
	);
}

export default ReportGeneratorInputParagraphField;
