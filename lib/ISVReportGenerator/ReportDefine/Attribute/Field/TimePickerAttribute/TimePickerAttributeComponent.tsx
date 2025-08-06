import React from 'react';

import AttributeList from '../../../../../attribute/AttributeList/AttributeList.tsx';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps.tsx';

import { TimePickerAttributeClass } from './TimePickerAttributeClass.ts';

function ReportTimePickerAttribute({
	attrPath,
	attribute,
	onSetAttribute,
}: FieldAttributeComponentProps<TimePickerAttributeClass>) {
	return (
		<>
			<AttributeList
				defaultExpanded={false}
				attribute={new TimePickerAttributeClass(attribute)}
				setAttribute={onSetAttribute}
				filterType="include"
				includeAttribute={['defaultNow']}
			/>
		</>
	);
}

export default ReportTimePickerAttribute;
