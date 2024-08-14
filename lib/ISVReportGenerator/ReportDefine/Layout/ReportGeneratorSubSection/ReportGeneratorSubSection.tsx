import React, { CSSProperties } from 'react';

import { Box, Chip } from '@mui/material';
import { Style } from '@react-pdf/types/style';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { FormFieldType, LayoutType } from '../../../../field/field-type.ts';
import { reportSubsection } from '../../../../ISVReport/style.ts';
import {
	isFieldsetTemplateFocus,
	selectedAttributeAtom,
	selectedAttributeTypeAtom,
	selectedDefineType,
} from '../../../../recoil/atoms/report-generator-atoms.ts';
import { SubSection } from '../../../../types/define.ts';
import { ArrayField } from '../../../../types/field/array-field.ts';
import { CompositeField } from '../../../../types/field/composite-field.ts';
import { Field } from '../../../../types/field/field.ts';
import BoxInspector from '../../../../UI/BoxInspector/BoxInspector.tsx';
import { SubSectionAttributeClass } from '../../Attribute/Layout/SubSectionAttribute/SubSectionAttributeClass.tsx';
import FieldsetTemplate from '../FieldsetTemplate/FieldsetTemplate';
import ReportGeneratorInputArrayField from '../ReportGeneratorInputArrayField/ReportGeneratorInputArrayField.tsx';
import ReportGeneratorInputCompositeField from '../ReportGeneratorInputCompositeField/ReportGeneratorInputCompositeField.tsx';
import ReportGeneratorInputFieldContainer from '../ReportGeneratorInputFieldContainer/ReportGeneratorInputFieldContainer';

interface Props {
	sectionIdx: number;
	subSectionIdx: number;
	subSection: SubSection;
	showGuideLine: boolean;
}

function ReportGeneratorSubSection({ sectionIdx, subSectionIdx, subSection, showGuideLine }: Props) {
	const path = ['sections', sectionIdx, 'subSections', subSectionIdx];
	const setSelectedAttribute = useSetRecoilState(selectedAttributeAtom);
	const setSelectedAttributeType = useSetRecoilState(selectedAttributeTypeAtom);
	const setDefineType = useSetRecoilState(selectedDefineType);
	const [isFocus, setFocus] = useRecoilState(isFieldsetTemplateFocus(path));

	const onSetAttributePath = (e) => {
		e.stopPropagation();
		setDefineType('FormDefine');
		setSelectedAttribute(new SubSectionAttributeClass(subSection));
		setSelectedAttributeType(LayoutType.SubSection);
		setFocus(true);
	};

	const style = subSection?.style as Style;

	return (
		<FieldsetTemplate
			id={subSection.id}
			style={{
				...reportSubsection,
				maxWidth: subSection?.maxWidth,
				width: subSection?.maxWidth,
				opacity: subSection?.hide || subSection?.hideInPDF ? 0.4 : 1,
			}}
			showGuideLine={showGuideLine}
			isFocus={isFocus}
			legendComp={<Chip sx={{ cursor: 'pointer' }} size="small" color="secondary" label={subSection.id} />}
			onClick={onSetAttributePath}
		>
			<BoxInspector
				paddingTop={style?.paddingTop || '0'}
				paddingBottom={style?.paddingBottom || '0'}
				paddingLeft={style?.paddingLeft || '0'}
				paddingRight={style?.paddingRight || '0'}
				marginTop={style?.marginTop || '0'}
				marginBottom={style?.marginBottom || '0'}
				marginLeft={style?.marginLeft || '0'}
				marginRight={style?.marginRight || '0'}
			>
				<Box
					style={
						{
							...reportSubsection,
							...((subSection?.style || {}) as CSSProperties),
						} as CSSProperties
					}
				>
					{subSection.fields.map((field, idx) => {
						switch (field.type) {
							case FormFieldType.Composite:
								return (
									<ReportGeneratorInputCompositeField
										key={field.id}
										sectionIdx={sectionIdx}
										subSectionIdx={subSectionIdx}
										fieldIdx={idx}
										field={field as CompositeField}
										showGuideLine={showGuideLine}
									/>
								);
							case FormFieldType.Array:
								return (
									<ReportGeneratorInputArrayField
										key={field.id}
										sectionIdx={sectionIdx}
										subSectionIdx={subSectionIdx}
										fieldIdx={idx}
										field={field as ArrayField}
										showGuideLine={showGuideLine}
									/>
								);
							default:
								return (
									<ReportGeneratorInputFieldContainer
										key={field.id}
										sectionIdx={sectionIdx}
										subSectionIdx={subSectionIdx}
										fieldIdx={idx}
										field={field as Field}
										showGuideLine={showGuideLine}
									/>
								);
						}
					})}
				</Box>
			</BoxInspector>
		</FieldsetTemplate>
	);
}

export default React.memo(ReportGeneratorSubSection);
