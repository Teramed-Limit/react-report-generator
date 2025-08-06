import React from 'react';

import AttributeList from '../../../../../attribute/AttributeList/AttributeList.tsx';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps.tsx';

import { SRTextAttributeClass } from './SRTextAttributeClass.ts';

function SRTextAttributeComponent({
	attrPath,
	attribute,
	onSetAttribute,
}: FieldAttributeComponentProps<SRTextAttributeClass>) {
	return (
		<>
			<AttributeList
				defaultExpanded={false}
				attribute={new SRTextAttributeClass(attribute)}
				setAttribute={onSetAttribute}
				filterType="include"
				includeAttribute={['structureReportPath', 'suffix', 'prefix', 'placeholder', 'daysToWeeks', 'formula']}
			/>
		</>
	);
}

export default SRTextAttributeComponent;
