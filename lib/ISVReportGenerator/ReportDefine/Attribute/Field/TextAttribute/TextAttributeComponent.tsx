import React from 'react';

import AttributeList from '../../../../../attribute/AttributeList/AttributeList.tsx';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps.tsx';

import { TextAttributeClass } from './TextAttributeClass.ts';

function TextAttributeComponent({
	attrPath,
	attribute,
	onSetAttribute,
}: FieldAttributeComponentProps<TextAttributeClass>) {
	return (
		<>
			<AttributeList
				defaultExpanded={false}
				attribute={new TextAttributeClass(attribute)}
				setAttribute={onSetAttribute}
				filterType="include"
				includeAttribute={['suffix', 'prefix', 'placeholder']}
			/>
		</>
	);
}

export default TextAttributeComponent;
