import React from 'react';

import AttributeList from '../../../../../../attribute/AttributeList/AttributeList.tsx';
import { FilterConditionAttribute } from './FilterConditionAttribute';

interface Props {
	attribute: any;
	attrPath?: (string | number)[];
	setAttribute: (attrName: (string | number)[], attrValue: any) => void;
}

function ReportFilterConditionAttribute({ attrPath = [], attribute, setAttribute }: Props) {
	return (
		<AttributeList
			attribute={new FilterConditionAttribute(attribute)}
			attrPath={attrPath}
			setAttribute={setAttribute}
		/>
	);
}

export default ReportFilterConditionAttribute;
