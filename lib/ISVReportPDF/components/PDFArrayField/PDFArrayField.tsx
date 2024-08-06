import React from 'react';

import ReactPDF from '@react-pdf/renderer';

import { FormFieldType } from '../../../field/field-type.ts';
import { ArrayField } from '../../../types/field/array-field.ts';
import { CompositeField } from '../../../types/field/composite-field.ts';
import PDFCompositeField from '../PDFCompositeField/PDFCompositeField.tsx';
import PDFField from '../PDFField/PDFField.tsx';

interface Props {
	field: ArrayField;
	formData: Record<string, any>;
	getOptions: (id: string) => any[];
}

const GenerateArrayFieldId = (fieldId: string, idx: number) => `${fieldId}_${idx}`;

function PDFArrayField({ field, formData, getOptions }: Props) {
	const fieldRenderer = (): React.JSX.Element => {
		const { templateField } = field;
		const valueList = formData[field.id] || [];
		switch (field.templateField.type) {
			case FormFieldType.Composite:
				return (
					<>
						{valueList?.map((_, idx) => {
							const key = GenerateArrayFieldId(templateField.id, idx);
							return (
								<PDFCompositeField
									key={key}
									field={
										{
											...templateField,
											label: `${templateField.label} ${idx + 1}`,
											orientation: field.orientation,
										} as CompositeField
									}
									formData={valueList[idx]}
									getOptions={getOptions}
								/>
							);
						})}
					</>
				);
			default:
				return (
					<>
						{valueList?.map((value, idx) => {
							const key = GenerateArrayFieldId(templateField.id, idx);
							const val = value?.[key] || '';
							return (
								<PDFField
									key={key}
									field={{
										...templateField,
										label: `${templateField.label} ${idx + 1}`,
										orientation: field.orientation,
									}}
									value={val}
									getOptions={getOptions}
								/>
							);
						})}
					</>
				);
		}
	};

	return (
		<>
			<ReactPDF.View style={{ flexDirection: field.arrayOrientation || 'column' }}>
				{fieldRenderer()}
			</ReactPDF.View>
		</>
	);
}

export default React.memo(PDFArrayField);
