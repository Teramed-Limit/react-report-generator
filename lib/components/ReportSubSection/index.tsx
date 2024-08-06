import { Box } from '@mui/material';

import { SubSection } from '../../types/define.ts';
import { styleConverter } from '../../utils/style-converter.ts';
import FieldContainer from '../FieldContainer/FieldContainer.tsx';
import { reportSubsection } from '../ISVReport/style.ts';

interface Props {
	subSection: SubSection;
}

export function ReportSubSection({ subSection }: Props) {
	return (
		<Box
			id={subSection.id}
			sx={{
				...reportSubsection,
				maxWidth: subSection?.maxWidth,
				width: subSection?.maxWidth,
				...(subSection?.style || {}),
				...styleConverter(subSection.style),
			}}
		>
			{subSection.fields
				.filter((field) => !field.hide)
				.map((field) => {
					switch (field.type) {
						// case FormFieldType.Composite:
						// 	return <FormSectionCompositeField key={field.id} field={field as CompositeField} />;
						// case FormFieldType.Array:
						// 	return <FieldArrayContainer key={field.id} field={field as ArrayField} />;
						default:
							return <FieldContainer key={field.id} field={field} />;
					}
				})}
		</Box>
	);
}
