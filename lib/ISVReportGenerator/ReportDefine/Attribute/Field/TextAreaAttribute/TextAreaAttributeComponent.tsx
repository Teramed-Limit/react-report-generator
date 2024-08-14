import React from 'react';

import AttributeList from '../../../../../attribute/AttributeList/AttributeList.tsx';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps.tsx';
import { TextAreaAttributeClass } from './TextAreaAttributeClass.ts';

function ReportTextAreaAttribute({
	attrPath,
	attribute,
	onSetAttribute,
}: FieldAttributeComponentProps<TextAreaAttributeClass>) {
	return (
		<>
			<AttributeList
				defaultExpanded={false}
				attribute={new TextAreaAttributeClass(attribute)}
				setAttribute={onSetAttribute}
				filterType="include"
				includeAttribute={['rows', 'placeholder', 'maxLength']}
			/>
		</>
	);
}

export default ReportTextAreaAttribute;
