import React, { CSSProperties } from 'react';

import { Box } from '@mui/material';

import { Section, SubSection } from '../../../types';
import { styleConverter } from '../../../utils/style-converter.ts';
import { reportSection } from '../../style.ts';
import { ReportSubSection } from '../ReportSubSection/ReportSubSection.tsx';
import classes from './ReportSection.module.scss';

interface Props {
	section: Section;
}

function ReportSection({ section }: Props) {
	return (
		<>
			{section?.label && (
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
			)}
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
