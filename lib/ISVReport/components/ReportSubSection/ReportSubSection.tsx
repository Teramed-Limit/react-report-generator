import { CSSProperties } from 'react';

import { Box } from '@mui/material';

import { FormFieldType } from '../../../field/field-type.ts';
import { SubSection } from '../../../types/define.ts';
import { ArrayField } from '../../../types/field/array-field.ts';
import { CompositeField } from '../../../types/field/composite-field.ts';
import { Field } from '../../../types/field/field.ts';
import { styleConverter } from '../../../utils/style-converter.ts';
import { reportSubsection } from '../../style.ts';
import FieldArrayContainer from '../FieldArrayContainer/FieldArrayContainer.tsx';
import FieldCompositeContainer from '../FieldCompositeContainer/FieldCompositeContainer.tsx';
import FieldContainer from '../FieldContainer/FieldContainer.tsx';

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
				...((subSection?.style as CSSProperties) || {}),
				...styleConverter(subSection.style as CSSProperties),
			}}
		>
			{subSection.fields
				.filter((field) => !field.hide)
				.map((field) => {
					switch (field.type) {
						case FormFieldType.Composite:
							return (
								<FieldCompositeContainer key={field.id} id={field.id} field={field as CompositeField} />
							);
						case FormFieldType.Array:
							return <FieldArrayContainer key={field.id} field={field as ArrayField} />;
						default:
							return (
								<FieldContainer
									key={field.id}
									id={field.id}
									field={field as Field}
									valueChangedId={[field.id]}
								/>
							);
					}
				})}
		</Box>
	);
}
