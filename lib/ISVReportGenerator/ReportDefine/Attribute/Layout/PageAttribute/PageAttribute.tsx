import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import * as R from 'ramda';
import { useSetRecoilState } from 'recoil';

import AttributeList from '../../../../../attribute/AttributeList/AttributeList.tsx';
import { FormFieldType } from '../../../../../field/field-type.ts';
import { selectedReportDefine } from '../../../../../recoil/atoms/report-generator-atoms.ts';
import { FormDefine, Section } from '../../../../../types/define.ts';
import { TextAttributeClass } from '../../Field/TextAttribute/TextAttributeClass.ts';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps.tsx';

function PageAttribute({ onSetAttribute }: FieldAttributeComponentProps<FormDefine>) {
	const setFormDefine = useSetRecoilState(selectedReportDefine);

	const addSection = () => {
		setFormDefine((currentFormDefine: FormDefine) => {
			// Create a new subsection
			const newSection: Section = {
				type: 'form',
				id: `section-${(currentFormDefine?.sections?.length || 0) + 1}`,
				maxWidth: '100%',
				hide: false,
				hideInPDF: false,
				subSections: [
					{
						id: `subSection-1`,
						maxWidth: '100%',
						hide: false,
						hideInPDF: false,
						fields: [
							new TextAttributeClass({
								id: `TextField_1`,
								labelWidth: '35%',
								type: FormFieldType.Text,
								orientation: 'row',
							}),
						],
					},
				],
			};

			// Append the new subsection to the current subsections
			const updated = [...(currentFormDefine.sections || []), newSection];

			// Use assocPath to update the subsections array
			return R.assocPath(['sections'], updated, currentFormDefine);
		});
	};

	return (
		<>
			<AttributeList title="Page" attribute={{}} setAttribute={onSetAttribute} />
			<Button variant="contained" color="warning" startIcon={<AddIcon />} onClick={addSection}>
				Add Section
			</Button>
		</>
	);
}

export default PageAttribute;
