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
import { Section, SubSection } from '../../../../../types/define.ts';
import ColorPickerButton from '../../../../../UI/ColorPickerButton/ColorPickerButton.tsx';
import ReportCSSStyleAttribute from '../../Common/Complex/ReportCSSStyleAttribute/ReportCSSStyleAttribute';
import PercentageNumber from '../../Common/PercentageNumber/PercentageNumber';
import { TextAttributeClass } from '../../Field/TextAttribute/TextAttributeClass.ts';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps.tsx';
import { SectionAttributeClass } from './SectionAttributeClass.tsx';

function SectionAttributeComponent({
	attrPath,
	attribute,
	onSetAttribute,
}: FieldAttributeComponentProps<SectionAttributeClass>) {
	const setFormDefine = useSetRecoilState(selectedReportDefine);
	const { moveEntity, copyEntity, deleteEntity } = useReportLayout(attrPath, 'Section');

	const addSubSection = () => {
		setFormDefine((currentFormDefine) => {
			// Get the current subsections from the path
			const currentSection: Section = R.path(attrPath, currentFormDefine) as Section;

			// Create a new subsection
			const newSubSection: SubSection = {
				id: `subSection-${currentSection.subSections.length + 1}`,
				maxWidth: '100%',
				hideInPDF: false,
				hide: false,
				fields: [
					new TextAttributeClass({
						id: `TextField_1`,
						labelWidth: '35%',
						type: FormFieldType.Text,
						orientation: 'row',
					}),
				],
			};

			// Append the new subsection to the current subsections
			const updatedSubSections = [...currentSection.subSections, newSubSection];

			// Use assocPath to update the subsections array
			return R.assocPath([...attrPath, 'subSections'], updatedSubSections, currentFormDefine);
		});
	};

	return (
		<>
			<AttributeList
				title="Section"
				defaultExpanded={false}
				attribute={attribute}
				setAttribute={onSetAttribute}
				filterType="exclude"
				attributeComponentMapper={{
					maxWidth: PercentageNumber,
					style: ReportCSSStyleAttribute,
					labelStyle: ReportCSSStyleAttribute,
					labelDecorationColor: ColorPickerButton,
				}}
				excludeAttribute={['subSections', 'type']}
				toolbar={
					<>
						<IconButton size="small" color="secondary" onClick={() => moveEntity(-1)}>
							<ArrowUpwardIcon />
						</IconButton>
						<IconButton size="small" color="secondary" onClick={() => moveEntity(1)}>
							<ArrowDownwardIcon />
						</IconButton>
						<IconButton size="small" color="primary" onClick={addSubSection}>
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

export default SectionAttributeComponent;
