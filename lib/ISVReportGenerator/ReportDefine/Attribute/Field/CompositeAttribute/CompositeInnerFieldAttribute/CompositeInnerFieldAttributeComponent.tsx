import React from 'react';

import AttributeList from '../../../../../../attribute/AttributeList/AttributeList.tsx';
import { FormFieldType } from '../../../../../../field/field-type.ts';
import ReportButtonBarAttribute from '../../../Common/Complex/ReportButtonBarAttribute/ReportButtonBarAttribute.tsx';
import ReportCSSStyleAttribute from '../../../Common/Complex/ReportCSSStyleAttribute/ReportCSSStyleAttribute.tsx';
import ReportValidateAttribute from '../../../Common/Complex/ReportValidateAttribute/ReportValidateAttribute.tsx';
import FieldTypeSelection from '../../../Common/FieldTypeSelection/FieldTypeSelection.tsx';
import OrientationSelection from '../../../Common/OrientationSelection/OrientationSelection.tsx';
import PercentageNumber from '../../../Common/PercentageNumber/PercentageNumber.tsx';
import { FieldAttributeClassMapper } from '../../../FieldAttributeClassMapper.ts';
import { CompositeInnerFieldAttributeClass } from './CompositeInnerFieldAttributeClass.ts';

interface Props {
	attrPath: (number | string)[];
	attribute: CompositeInnerFieldAttributeClass;
	onSetAttribute: (attrPath: (number | string)[], attrValue: number | string | boolean) => void;
	toolbar?: React.ReactNode;
}

function CompositeInnerFieldAttributeComponent({ attrPath, attribute, onSetAttribute, toolbar }: Props) {
	return (
		<AttributeList
			title={attribute.id}
			defaultExpanded={false}
			attribute={new CompositeInnerFieldAttributeClass(attribute)}
			setAttribute={onSetAttribute}
			toolbar={toolbar}
			attributeComponentMapper={{
				orientation: OrientationSelection,
				type: (
					<FieldTypeSelection
						value={attribute.type}
						exclude={[FormFieldType.Composite, FormFieldType.Array]}
						onValueChange={(value) => {
							const attributeInstance = FieldAttributeClassMapper[value](attribute);
							onSetAttribute([], {
								...attributeInstance,
								type: value,
							});
						}}
					/>
				),
				width: PercentageNumber,
				validate: ReportValidateAttribute,
				valueStyle: ReportCSSStyleAttribute,
				buttonBar: ReportButtonBarAttribute,
			}}
		/>
	);
}

export default CompositeInnerFieldAttributeComponent;
