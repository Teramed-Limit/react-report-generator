import React from 'react';

import AttributeList from '../../../../../attribute/AttributeList/AttributeList';
import { FormFieldType } from '../../../../../field/field-type';
import { ParagraphInnerField } from '../../../../../types/field/paragraph-field';
import BaseTextArea from '../../../../../UI/BaseTextArea/BaseTextArea';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps';
import { ParagraphAttributeClass } from './ParagraphAttributeClass';
import { ParagraphInnerFieldsAttributeClass } from './ParagraphInnerFieldsAttributeComponent/ParagraphInnerFieldsAttributeClass';
import ParagraphInnerFieldsAttributeComponent from './ParagraphInnerFieldsAttributeComponent/ParagraphInnerFieldsAttributeComponent';

function ParagraphAttributeComponent({
	attrPath,
	attribute,
	onSetAttribute,
}: FieldAttributeComponentProps<ParagraphAttributeClass>) {
	const onSetParagraphAttribute = (attrName: (string | number)[], attrValue: any) => {
		if (attrName[0] === 'text') {
			const text = attrValue;
			const count = (text.match(/%s/g) || []).length;
			const fields: ParagraphInnerField[] = [];
			for (let i = 0; i < count; i++) {
				fields.push(
					new ParagraphInnerFieldsAttributeClass({
						id: `${attribute.id}_Child_${i}`,
						type: FormFieldType.Text,
						maxWidth: '10%',
					}),
				);
			}
			onSetAttribute(['fields'], fields);
		}
		onSetAttribute(attrName, attrValue);
	};

	return (
		<>
			<AttributeList
				defaultExpanded={false}
				attribute={new ParagraphAttributeClass(attribute)}
				setAttribute={onSetParagraphAttribute}
				includeAttribute={['text', 'fields']}
				filterType="include"
				attributeComponentMapper={{
					text: BaseTextArea,
					fields: (
						<ParagraphInnerFieldsAttributeComponent
							attrPath={[...attrPath, 'fields']}
							attribute={attribute.fields}
							onSetAttribute={onSetAttribute}
						/>
					),
				}}
			/>
		</>
	);
}

export default React.memo(ParagraphAttributeComponent);
