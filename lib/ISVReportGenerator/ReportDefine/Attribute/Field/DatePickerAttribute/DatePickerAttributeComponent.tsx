import React from 'react';

import AttributeList from '../../../../../attribute/AttributeList/AttributeList.tsx';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps.tsx';
import { DatePickerAttributeClass } from './DatePickerAttributeClass.ts';

function DatePickerAttributeComponent({
	attrPath,
	attribute,
	onSetAttribute,
}: FieldAttributeComponentProps<DatePickerAttributeClass>) {
	return (
		<>
			<AttributeList
				defaultExpanded={false}
				attribute={new DatePickerAttributeClass(attribute)}
				setAttribute={onSetAttribute}
				filterType="include"
				includeAttribute={['defaultToday', 'fromFormat', 'toFormat']}
			/>
		</>
	);
}

export default DatePickerAttributeComponent;
