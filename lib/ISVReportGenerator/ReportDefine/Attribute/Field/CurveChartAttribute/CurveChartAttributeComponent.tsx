import React from 'react';

import AttributeList from '../../../../../attribute/AttributeList/AttributeList.tsx';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps.tsx';
import { CurveChartAttributeClass } from './CurveChartAttributeClass.ts';

function CurveChartAttributeComponent({
	attrPath,
	attribute,
	onSetAttribute,
}: FieldAttributeComponentProps<CurveChartAttributeClass>) {
	return (
		<>
			<AttributeList
				defaultExpanded={false}
				attribute={new CurveChartAttributeClass(attribute)}
				setAttribute={onSetAttribute}
				filterType="include"
			/>
		</>
	);
}

export default CurveChartAttributeComponent;
