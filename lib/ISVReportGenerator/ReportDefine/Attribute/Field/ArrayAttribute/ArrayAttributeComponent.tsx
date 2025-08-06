import React from 'react';

import AttributeList from '../../../../../attribute/AttributeList/AttributeList.tsx';
import OrientationSelection from '../../Common/OrientationSelection/OrientationSelection.tsx';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps.tsx';

import { ArrayAttributeClass } from './ArrayAttributeClass.ts';
import TemplateAttributeComponent from './TemplateAttribute/TemplateAttributeComponent.tsx';

function ArrayAttributeComponent({
	attrPath,
	attribute,
	onSetAttribute,
}: FieldAttributeComponentProps<ArrayAttributeClass>) {
	return (
		<>
			<AttributeList
				defaultExpanded={false}
				attribute={new ArrayAttributeClass(attribute)}
				setAttribute={onSetAttribute}
				attributeComponentMapper={{
					arrayOrientation: OrientationSelection,
					templateField: (
						<TemplateAttributeComponent
							attrPath={[...attrPath, 'templateField']}
							attribute={attribute.templateField}
							setAttribute={onSetAttribute}
						/>
					),
				}}
				filterType="include"
				includeAttribute={['templateField', 'arrayOrientation']}
			/>
		</>
	);
}

export default ArrayAttributeComponent;
