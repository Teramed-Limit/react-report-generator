import React, { CSSProperties } from 'react';

import { Chip } from '@mui/material';
import Box from '@mui/material/Box';
import { Style } from '@react-pdf/types/style';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { LayoutType } from '../../../../field/field-type.ts';
import { reportSection } from '../../../../ISVReport/style.ts';
import {
	isFieldsetTemplateFocus,
	selectedAttributeAtom,
	selectedAttributeTypeAtom,
	selectedDefineType,
} from '../../../../recoil/atoms/report-generator-atoms.ts';
import { Section, SubSection } from '../../../../types/define.ts';
import BoxInspector from '../../../../UI/BoxInspector/BoxInspector.tsx';
import { SectionAttributeClass } from '../../Attribute/Layout/SectionAttribute/SectionAttributeClass.tsx';
import FieldsetTemplate from '../FieldsetTemplate/FieldsetTemplate';
import ReportGeneratorSubSection from '../ReportGeneratorSubSection/ReportGeneratorSubSection';

interface Props {
	section: Section;
	sectionIdx: number;
	showGuideLine: boolean;
}

function ReportGeneratorSection({ section, sectionIdx, showGuideLine }: Props) {
	const path = ['sections', sectionIdx];
	const setSelectedAttribute = useSetRecoilState(selectedAttributeAtom);
	const setSelectedAttributeType = useSetRecoilState(selectedAttributeTypeAtom);
	const setDefineType = useSetRecoilState(selectedDefineType);
	const [isFocus, setFocus] = useRecoilState(isFieldsetTemplateFocus(path));

	const onSetAttributePath = (e) => {
		e.stopPropagation();
		setDefineType('FormDefine');
		setSelectedAttribute(new SectionAttributeClass(section));
		setSelectedAttributeType(LayoutType.Section);
		setFocus(false);
	};

	const style = section?.style as Style;

	return (
		<FieldsetTemplate
			id={section.id}
			style={
				{
					...reportSection,
					maxWidth: section.maxWidth,
					width: section.maxWidth,
					opacity: section?.hide || section?.hideInPDF ? 0.4 : 1,
				} as CSSProperties
			}
			showGuideLine={showGuideLine}
			isFocus={isFocus}
			legendComp={<Chip sx={{ cursor: 'pointer' }} size="small" color="primary" label={section.id} />}
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
							...reportSection,
							...((section?.style || {}) as CSSProperties),
						} as CSSProperties
					}
				>
					{section.subSections.map((subSection: SubSection, idx: number) => (
						<ReportGeneratorSubSection
							key={subSection.id}
							showGuideLine={showGuideLine}
							sectionIdx={sectionIdx}
							subSectionIdx={idx}
							subSection={subSection}
						/>
					))}
				</Box>
			</BoxInspector>
		</FieldsetTemplate>
	);
}

export default React.memo(ReportGeneratorSection);
