import React from 'react';

import AttributeList from '../../../../../../attribute/AttributeList/AttributeList.tsx';
import OptionSourceSelection from '../../OptionSourceSelection/OptionSourceSelection';
import OptionTypeSelection from '../../OptionTypeSelection/OptionTypeSelection';
import { OptionSourceAttribute } from './OptionSourceAttribute';

interface Props {
	attribute: any;
	attrPath?: (string | number)[];
	setAttribute: (attrName: (string | number)[], attrValue: any) => void;
}

function ReportOptionSourceAttribute({ attrPath = [], attribute, setAttribute }: Props) {
	return (
		<AttributeList
			attribute={new OptionSourceAttribute(attribute)}
			attrPath={attrPath}
			setAttribute={setAttribute}
			attributeComponentMapper={{
				type: OptionTypeSelection,
				source: OptionSourceSelection,
			}}
		/>
	);
}

export default ReportOptionSourceAttribute;
