import React from 'react';

import AttributeList from '../../../../../../attribute/AttributeList/AttributeList.tsx';
import { Field } from '../../../../../../types/field/field.ts';
import OptionTypeSelection from '../../OptionTypeSelection/OptionTypeSelection';
import { FieldsAttribute } from './FieldsAttribute';

interface Props {
	attribute: Field[];
	attrPath?: (string | number)[];
	setAttribute: (attrName: (string | number)[], attrValue: any) => void;
}

function ReportFieldsAttribute({ attrPath = [], attribute, setAttribute }: Props) {
	return (
		<AttributeList
			attribute={new FieldsAttribute(attribute)}
			attrPath={attrPath}
			setAttribute={setAttribute}
			attributeComponentMapper={{
				fields: OptionTypeSelection,
			}}
		/>
	);
}

export default ReportFieldsAttribute;
