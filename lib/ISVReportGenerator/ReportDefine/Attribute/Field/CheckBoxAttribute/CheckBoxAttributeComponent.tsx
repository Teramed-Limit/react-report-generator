import React from 'react';

import AttributeList from '../../../../../attribute/AttributeList/AttributeList.tsx';
import ReportOptionSourceAttribute from '../../Common/Complex/ReportOptionSourceAttribute/ReportOptionSourceAttribute.tsx';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps.tsx';

import { CheckBoxAttributeClass } from './CheckBoxAttributeClass.ts';

function CheckBoxAttributeComponent({
	attrPath,
	attribute,
	onSetAttribute,
}: FieldAttributeComponentProps<CheckBoxAttributeClass>) {
	return (
		<>
			<AttributeList
				defaultExpanded={false}
				attribute={new CheckBoxAttributeClass(attribute)}
				setAttribute={onSetAttribute}
				attributeComponentMapper={{ optionSource: ReportOptionSourceAttribute }}
				filterType="include"
				includeAttribute={['checkboxLabel']}
			/>
		</>
	);
}

export default CheckBoxAttributeComponent;
