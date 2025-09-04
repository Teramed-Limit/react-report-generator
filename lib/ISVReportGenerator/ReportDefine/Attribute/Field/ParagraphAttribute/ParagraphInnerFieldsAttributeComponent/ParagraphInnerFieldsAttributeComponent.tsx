import React from 'react';

import AttributeList from '../../../../../../attribute/AttributeList/AttributeList';
import { ParagraphInnerField } from '../../../../../../types/field/paragraph-field';
import ReportCSSStyleAttribute from '../../../Common/Complex/ReportCSSStyleAttribute/ReportCSSStyleAttribute';
import ReportValidateAttribute from '../../../Common/Complex/ReportValidateAttribute/ReportValidateAttribute';
import OrientationSelection from '../../../Common/OrientationSelection/OrientationSelection';
import PercentageNumber from '../../../Common/PercentageNumber/PercentageNumber';
import { FieldAttributeComponentProps } from '../../../FieldAttributeComponentProps';
import { ParagraphInnerFieldsAttributeClass } from './ParagraphInnerFieldsAttributeClass';

type Props = FieldAttributeComponentProps<ParagraphInnerField[]>;

function ParagraphInnerFieldsAttributeComponent({ attrPath, attribute, onSetAttribute }: Props) {
	return (
		<>
			{attribute?.map((field, index) => {
				// const RenderAttribute = ReportDefineAttributesMapper[field.type];
				// if (!RenderAttribute) {
				//     console.error(`No attribute component for ${field.type}`);
				//     return null;
				// }
				return (
					<React.Fragment key={field.id}>
						<AttributeList
							title={field.id}
							defaultExpanded={false}
							attribute={new ParagraphInnerFieldsAttributeClass(field)}
							setAttribute={(
								attributePath: (number | string)[],
								attributeValue: number | string | boolean,
							) => {
								onSetAttribute(['fields', index, ...attributePath], attributeValue);
							}}
							excludeAttribute={['type']}
							filterType="exclude"
							attributeComponentMapper={{
								orientation: OrientationSelection,
								maxWidth: PercentageNumber,
								// type: () => (
								// 	<FieldTypeSelection
								// 		value={field.type}
								// 		options={[FormFieldType.Text]}
								// 		onValueChange={(value) => {
								// 			const attributeInstance = FieldAttributeMapper[value](attribute);

								// 			onSetAttribute(['fields', index], {
								// 				...attributeInstance,
								// 				type: value,
								// 			} as ParagraphInnerField);
								// 		}}
								// 	/>
								// ),
								validate: ReportValidateAttribute,
								valueStyle: ReportCSSStyleAttribute,
							}}
						/>
					</React.Fragment>
				);
			})}
		</>
	);
}

export default React.memo(ParagraphInnerFieldsAttributeComponent);
