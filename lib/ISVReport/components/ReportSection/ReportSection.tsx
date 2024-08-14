import React, { CSSProperties } from 'react';

import { Box } from '@mui/material';

import { Section, SubSection } from '../../../types/define.ts';
import { styleConverter } from '../../../utils/style-converter.ts';
import { reportSection } from '../../style.ts';
import { ReportSubSection } from '../ReportSubSection/ReportSubSection.tsx';

interface Props {
	section: Section;
}

function ReportSection({ section }: Props) {
	return (
		<>
			{/* {section?.label && ( */}
			{/*	<div className={classes[`section-header`]}> */}
			{/*		<h4 className={classes[`header-label`]}>{section?.label}</h4> */}
			{/*	</div> */}
			{/* )} */}
			<Box
				id={section.id}
				sx={{
					...reportSection,
					maxWidth: section.maxWidth,
					width: section.maxWidth,
					opacity: section.hide ? 0.4 : 1,
					...((section?.style as CSSProperties) || {}),
					...styleConverter(section.style as CSSProperties),
				}}
			>
				{section.subSections.map((subSection: SubSection) => (
					<ReportSubSection key={subSection.id} subSection={subSection} />
				))}
			</Box>
		</>
	);
}

export default React.memo(ReportSection);
