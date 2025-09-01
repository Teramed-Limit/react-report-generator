import React, { CSSProperties } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Chip, Menu, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as R from 'ramda';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { FormFieldType } from '../../../../field/field-type.ts';
import { usePopupState } from '../../../../hooks/usePopupState.ts';
import FieldContainer from '../../../../ISVReport/components/FieldContainer/FieldContainer.tsx';
import { fieldGutter, fieldSectionContainer } from '../../../../ISVReport/style.ts';
import { imageDefineAtom } from '../../../../recoil/atoms/formDefineAtoms.ts';
import {
	selectedAttributeAtom,
	selectedAttributePathAtom,
	selectedAttributeTypeAtom,
	selectedDefineType,
	selectedFieldsAtom,
} from '../../../../recoil/atoms/report-generator-atoms';
import { Field } from '../../../../types/field/field.ts';
import { TextField } from '../../../../types/field/text-field.ts';
import { TextAttributeClass } from '../../Attribute/Field/TextAttribute/TextAttributeClass.ts';
import { FieldAttributeClassMapper } from '../../Attribute/FieldAttributeClassMapper.ts';
import FieldsetTemplate from '../FieldsetTemplate/FieldsetTemplate.tsx';

interface Props {
	showGuideLine: boolean;
}

function ReportGeneratorImagePage({ showGuideLine }: Props) {
	const fields = useRecoilValue(imageDefineAtom);
	const { anchorEl, open, handleClick, handleClose } = usePopupState();
	const setAttributePath = useSetRecoilState(selectedAttributePathAtom);
	const setSelectedAttribute = useSetRecoilState(selectedAttributeAtom);
	const setSelectedAttributeType = useSetRecoilState(selectedAttributeTypeAtom);
	const setSelectedFields = useSetRecoilState(selectedFieldsAtom);
	const setDefineType = useSetRecoilState(selectedDefineType);
	const setImageDefine = useSetRecoilState(imageDefineAtom);
	const selectedFieldList = useRecoilValue(selectedFieldsAtom);

	const onSetAttributePath = (field: Field, idx: number) => {
		const attributeInstance = FieldAttributeClassMapper[field.type](field);
		setAttributePath([idx]);
		setSelectedAttribute(attributeInstance);
		setSelectedAttributeType(field.type);
		setSelectedFields(new Set<string>().add(JSON.stringify([field.id])));
	};

	const addField = (e) => {
		e.stopPropagation();
		setAttributePath([]);
		setImageDefine((prev) => {
			return R.insert(
				prev.length,
				new TextAttributeClass({
					id: `TextField_${prev.length}`,
					label: 'Label',
					labelWidth: '35%',
					orientation: 'row',
					type: FormFieldType.Text,
				}) as TextField,
				prev,
			);
		});
	};

	const deleteField = (e: Event, idx: number) => {
		e.stopPropagation();
		setAttributePath([]);
		setImageDefine((prev) => R.dissocPath([idx], prev));
	};

	return (
		<fieldset
			style={{ width: '100%', marginTop: '4px' }}
			onClick={() => {
				setDefineType('ImageDefine');
			}}
		>
			<legend>
				<Chip
					sx={{ cursor: 'pointer' }}
					size="small"
					color="warning"
					label="Image Page"
					onDelete={handleClick}
					deleteIcon={<MoreVertIcon />}
				/>
				<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
					<MenuItem onClick={addField}>
						<ListItemIcon>
							<ContentCopyIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText>Add Field</ListItemText>
					</MenuItem>
				</Menu>
			</legend>
			<Box sx={{ textAlign: 'center' }}>
				<img style={{ textAlign: 'center' }} src="https://picsum.photos/320/180" alt="random" />
			</Box>
			{fields.map((field, idx) => {
				return (
					<FieldsetTemplate
						key={field.id}
						id={`formSectionFieldContainer__${field.id}`}
						style={
							{
								...fieldSectionContainer,
								flexDirection: field.orientation,
								padding: fieldGutter,
							} as CSSProperties
						}
						showGuideLine={showGuideLine}
						isFocus={selectedFieldList.has(JSON.stringify([field.id]))}
						legendComp={
							<legend>
								<Chip
									sx={{ cursor: 'pointer' }}
									size="small"
									color="success"
									label={field.id}
									onDelete={(e) => deleteField(e, idx)}
									deleteIcon={<DeleteIcon />}
								/>
							</legend>
						}
						onClick={(e: Event) => {
							e.preventDefault();
							onSetAttributePath(field, idx);
						}}
					>
						<FieldContainer
							key={field.id}
							id={field.id}
							field={field as Field}
							valueChangedId={[field.id]}
						/>
					</FieldsetTemplate>
				);
			})}
		</fieldset>
	);
}

export default React.memo(ReportGeneratorImagePage);
