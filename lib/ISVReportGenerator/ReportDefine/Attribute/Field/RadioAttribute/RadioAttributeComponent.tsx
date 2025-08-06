import React from 'react';

import AttributeList from '../../../../../attribute/AttributeList/AttributeList.tsx';
import ReportOptionSourceAttribute from '../../Common/Complex/ReportOptionSourceAttribute/ReportOptionSourceAttribute.tsx';
import OrientationSelection from '../../Common/OrientationSelection/OrientationSelection.tsx';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps.tsx';

import { RadioAttributeClass } from './RadioAttributeClass.ts';

function RadioAttributeComponent({
	attrPath,
	attribute,
	onSetAttribute,
}: FieldAttributeComponentProps<RadioAttributeClass>) {
	return (
		<>
			<AttributeList
				defaultExpanded={false}
				attribute={new RadioAttributeClass(attribute)}
				setAttribute={onSetAttribute}
				attributeComponentMapper={{
					optionSource: ReportOptionSourceAttribute,
					direction: OrientationSelection,
				}}
				filterType="include"
				includeAttribute={['direction', 'optionSource', 'filterCondition']}
			/>
		</>
	);
}

export default RadioAttributeComponent;
