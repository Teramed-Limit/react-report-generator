import React from 'react';

import AttributeList from '../../../../../attribute/AttributeList/AttributeList.tsx';
import ReportOptionSourceAttribute from '../../Common/Complex/ReportOptionSourceAttribute/ReportOptionSourceAttribute.tsx';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps.tsx';
import { CodeListLexiconAttributeClass } from './CodeListLexiconAttributeClass.ts';

function CodeListLexiconAttributeComponent({
	attrPath,
	attribute,
	onSetAttribute,
}: FieldAttributeComponentProps<CodeListLexiconAttributeClass>) {
	return (
		<>
			<AttributeList
				defaultExpanded={false}
				attribute={new CodeListLexiconAttributeClass(attribute)}
				setAttribute={onSetAttribute}
				attributeComponentMapper={{ optionSource: ReportOptionSourceAttribute }}
				filterType="include"
				includeAttribute={['maxLength', 'optionSource', 'filterCondition']}
			/>
		</>
	);
}

export default CodeListLexiconAttributeComponent;
