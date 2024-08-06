import React from 'react';

import AttributeList from '../../../../../../attribute/AttributeList/AttributeList.tsx';
import ValidateTypeSelection from '../../ValidateTypeSelection/ValidateTypeSelection';
import { ValidateAttribute } from './ValidateAttribute';

interface Props {
	attribute: any;
	attrPath?: (string | number)[];
	setAttribute: (attrName: (string | number)[], attrValue: any) => void;
}

function ReportValidateAttribute({ attrPath = [], attribute, setAttribute }: Props) {
	return (
		<AttributeList
			attrPath={attrPath}
			attribute={new ValidateAttribute(attribute)}
			setAttribute={setAttribute}
			attributeComponentMapper={{
				type: ValidateTypeSelection,
			}}
		/>
	);
}

export default ReportValidateAttribute;
