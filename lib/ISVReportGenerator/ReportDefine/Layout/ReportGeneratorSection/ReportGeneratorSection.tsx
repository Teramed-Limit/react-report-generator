import React, { CSSProperties } from 'react';

import { Chip } from '@mui/material';
import Box from '@mui/material/Box';
import { Style } from '@react-pdf/types/style';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { LayoutType } from '../../../../field/field-type.ts';
import classes from '../../../../ISVReport/components/ReportSection/ReportSection.module.scss';
import { reportSection } from '../../../../ISVReport/style.ts';
import {
	isFieldsetTemplateFocus,
	selectedAttributeAtom,
	selectedAttributeTypeAtom,
	selectedDefineType,
} from '../../../../recoil/atoms/report-generator-atoms.ts';
import { Section, SubSection } from '../../../../types';
import BoxInspector from '../../../../UI/BoxInspector/BoxInspector.tsx';
import { styleConverter } from '../../../../utils/style-converter.ts';
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

	const sectionLableStyle = section?.labelStyle as Style;

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
					{section?.label && (
						<BoxInspector
							paddingTop={sectionLableStyle?.paddingTop || '0'}
							paddingBottom={sectionLableStyle?.paddingBottom || '0'}
							paddingLeft={sectionLableStyle?.paddingLeft || '0'}
							paddingRight={sectionLableStyle?.paddingRight || '0'}
							marginTop={sectionLableStyle?.marginTop || '0'}
							marginBottom={sectionLableStyle?.marginBottom || '0'}
							marginLeft={sectionLableStyle?.marginLeft || '0'}
							marginRight={sectionLableStyle?.marginRight || '0'}
						>
							<div
								className={classes[`section-header`]}
								style={{
									...((section?.labelStyle as CSSProperties) || {}),
									...styleConverter(section.labelStyle as CSSProperties),
								}}
							>
								<div
									style={{ backgroundColor: section.labelDecorationColor }}
									className={classes['label-decoration']}
								/>
								<h4 style={{}} className={classes[`header-label`]}>
									{section?.label}
								</h4>
							</div>
						</BoxInspector>
					)}
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
