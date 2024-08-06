import React from 'react';

import AttributeList from '../../../../../attribute/AttributeList/AttributeList.tsx';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps.tsx';
import { DiagramAttributeClass } from './DiagramAttributeClass.ts';

function DiagramAttributeComponent({
	attrPath,
	attribute,
	onSetAttribute,
}: FieldAttributeComponentProps<DiagramAttributeClass>) {
	return (
		<>
			<AttributeList
				defaultExpanded={false}
				attribute={new DiagramAttributeClass(attribute)}
				setAttribute={onSetAttribute}
				filterType="include"
				includeAttribute={['hideToolbar', 'width', 'height']}
			/>
		</>
	);
}

export default DiagramAttributeComponent;
