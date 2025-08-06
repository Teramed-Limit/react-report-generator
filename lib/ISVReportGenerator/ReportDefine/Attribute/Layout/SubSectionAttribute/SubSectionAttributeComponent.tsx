import React from 'react';

import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import * as R from 'ramda';
import { useSetRecoilState } from 'recoil';

import AttributeList from '../../../../../attribute/AttributeList/AttributeList.tsx';
import { FormFieldType } from '../../../../../field/field-type.ts';
import { useReportLayout } from '../../../../../hooks/useReportLayout.ts';
import { selectedReportDefine } from '../../../../../recoil/atoms/report-generator-atoms.ts';
import { SubSection } from '../../../../../types/define.ts';
import { Field } from '../../../../../types/field/field.ts';
import ReportCSSStyleAttribute from '../../Common/Complex/ReportCSSStyleAttribute/ReportCSSStyleAttribute';
import PercentageNumber from '../../Common/PercentageNumber/PercentageNumber';
import { TextAttributeClass } from '../../Field/TextAttribute/TextAttributeClass.ts';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps.tsx';

import { SubSectionAttributeClass } from './SubSectionAttributeClass.tsx';

function SubSectionAttributeComponent({
	attrPath,
	attribute,
	onSetAttribute,
}: FieldAttributeComponentProps<SubSectionAttributeClass>) {
	const { moveEntity, copyEntity, deleteEntity } = useReportLayout(attrPath, 'SubSection');
	const setFormDefine = useSetRecoilState(selectedReportDefine);

	const addField = () => {
		setFormDefine((currentFormDefine) => {
			// Create a path to the 'fields' of the targeted SubSection
			const fieldsPath = [...attrPath, 'fields'];

			// Get the current fields using the generated path
			const currentFields = R.path<Field[]>(fieldsPath, currentFormDefine) || [];

			// Create a new TextFieldAttribute
			const field = new TextAttributeClass({
				id: `TextField_${currentFields.length + 1}`,
				labelWidth: '35%',
				type: FormFieldType.Text,
				orientation: 'row',
			});

			// Use assocPath to set the updated fields
			return R.assocPath(fieldsPath, [...currentFields, field], currentFormDefine);
		});
	};

	return (
		<>
			<AttributeList
				title="SubSection"
				attribute={attribute}
				defaultExpanded={false}
				setAttribute={onSetAttribute}
				filterType="exclude"
				attributeComponentMapper={{
					maxWidth: PercentageNumber,
					style: ReportCSSStyleAttribute,
				}}
				excludeAttribute={['fields']}
				toolbar={
					<>
						<IconButton size="small" color="secondary" onClick={() => moveEntity(-1)}>
							<ArrowUpwardIcon />
						</IconButton>
						<IconButton size="small" color="secondary" onClick={() => moveEntity(1)}>
							<ArrowDownwardIcon />
						</IconButton>
						<IconButton size="small" color="primary" onClick={addField}>
							<AddToPhotosIcon />
						</IconButton>
						<IconButton size="small" color="primary" onClick={copyEntity}>
							<ContentCopyIcon />
						</IconButton>
						<IconButton size="small" color="error" onClick={deleteEntity}>
							<DeleteIcon />
						</IconButton>
					</>
				}
			/>
		</>
	);
}

export default SubSectionAttributeComponent;
