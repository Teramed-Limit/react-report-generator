import React from 'react';

import AttributeList from '../../../../../attribute/AttributeList/AttributeList.tsx';
import ReportFilterConditionAttribute from '../../Common/Complex/ReportFilterConditionAttribute/ReportFilterConditionAttribute.tsx';
import ReportOptionSourceAttribute from '../../Common/Complex/ReportOptionSourceAttribute/ReportOptionSourceAttribute.tsx';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps.tsx';

import { CodeListSelectionAttributeClass } from './CodeListSelectionAttributeClass.ts';

function CodeListSelectionAttributeComponent({
	attrPath,
	attribute,
	onSetAttribute,
}: FieldAttributeComponentProps<CodeListSelectionAttributeClass>) {
	return (
		<>
			<AttributeList
				defaultExpanded={false}
				attribute={new CodeListSelectionAttributeClass(attribute)}
				setAttribute={onSetAttribute}
				attributeComponentMapper={{
					optionSource: ReportOptionSourceAttribute,
					filterCondition: ReportFilterConditionAttribute,
				}}
				filterType="include"
				includeAttribute={['isMulti', 'optionSource', 'filterCondition', 'joinStr']}
			/>
		</>
	);
}

export default CodeListSelectionAttributeComponent;
