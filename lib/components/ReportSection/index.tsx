import { Box } from '@mui/material';

import { Section, SubSection } from '../../types/define.ts';
import { styleConverter } from '../../utils/style-converter.ts';
import { reportSection } from '../ISVReport/style.ts';
import { ReportSubSection } from '../ReportSubSection';
import classes from './styles.module.scss';

interface Props {
	section: Section;
}

export function ReportSection({ section }: Props) {
	return (
		<>
			{section?.label && (
				<div className={classes[`section-header`]}>
					<h4 className={classes[`header-label`]}>{section?.label}</h4>
				</div>
			)}
			<Box
				id={section.id}
				sx={{
					...reportSection,
					maxWidth: section.maxWidth,
					width: section.maxWidth,
					opacity: section.hide ? 0.4 : 1,
					...(section?.style || {}),
					...styleConverter(section.style),
				}}
			>
				{section.subSections.map((subSection: SubSection) => (
					<ReportSubSection key={subSection.id} subSection={subSection} />
				))}
			</Box>
		</>
	);
}
