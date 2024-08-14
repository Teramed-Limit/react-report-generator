import React from 'react';

import AttributeList from '../../../../attribute/AttributeList/AttributeList.tsx';
import { RepPage } from '../../../../types/report-generator/rep-page.ts';
import { camelize } from '../../../../utils/general.ts';

interface Props {
	pageAttribute: RepPage;
	onSetPageAttribute: (attrPath: (number | string)[], attrValue: number | string | boolean) => void;
}

function ReportPageAttribute({ pageAttribute, onSetPageAttribute }: Props) {
	return (
		<>
			<AttributeList
				title={camelize(pageAttribute.name)}
				attribute={pageAttribute}
				setAttribute={onSetPageAttribute}
				filterType="exclude"
				excludeAttribute={['components', 'name', 'width']}
			/>
		</>
	);
}

export default ReportPageAttribute;
