import React from 'react';

import AttributeList from '../../../../../../attribute/AttributeList/AttributeList.tsx';
import { FormFieldType } from '../../../../../../field/field-type.ts';
import { CompositeField } from '../../../../../../types/field/composite-field.ts';
import { Field } from '../../../../../../types/field/field.ts';
import ReportCSSStyleAttribute from '../../../Common/Complex/ReportCSSStyleAttribute/ReportCSSStyleAttribute';
import ReportValidateAttribute from '../../../Common/Complex/ReportValidateAttribute/ReportValidateAttribute';
import FieldTypeSelection from '../../../Common/FieldTypeSelection/FieldTypeSelection';
import OrientationSelection from '../../../Common/OrientationSelection/OrientationSelection';
import PercentageNumber from '../../../Common/PercentageNumber/PercentageNumber';
import { FieldAttributeClassMapper } from '../../../FieldAttributeClassMapper.ts';
import { BaseAttributeClass } from '../../BaseAttribute/BaseAttributeClass.ts';
import { CompositeAttributeClass } from '../../CompositeAttribute/CompositeAttributeClass.ts';
import { ArrayAttributeComponentMapper } from '../ArrayAttributeComponentMapper.tsx';

interface Props {
	attrPath: (number | string)[];
	attribute: Field | CompositeField;
	setAttribute: (attrPath: (number | string)[], attrValue: number | string | boolean) => void;
}

function TemplateAttributeComponent({ attrPath, attribute, setAttribute }: Props) {
	const renderComponent = () => {
		if (!attribute.type) return null;

		const ComponentToRender = ArrayAttributeComponentMapper[attribute.type];
		if (!ComponentToRender) return null;

		let renderAttribute;
		if (ComponentToRender) {
			switch (attribute.type) {
				case FormFieldType.Composite:
					renderAttribute = new CompositeAttributeClass(attribute as CompositeAttributeClass);
					break;
				default:
					renderAttribute = new BaseAttributeClass(attribute as BaseAttributeClass);
					break;
			}
		}
		return (
			<>
				<AttributeList
					title={attribute.id}
					defaultExpanded={false}
					attribute={renderAttribute}
					setAttribute={(attributePath: (number | string)[], attributeValue: number | string | boolean) => {
						setAttribute(['templateField', ...attributePath], attributeValue);
					}}
					attributeComponentMapper={{
						orientation: OrientationSelection,
						validate: ReportValidateAttribute,
						labelStyle: ReportCSSStyleAttribute,
						labelWidth: PercentageNumber,
						valueStyle: ReportCSSStyleAttribute,
						type: (
							<FieldTypeSelection
								value={attribute.type}
								exclude={[FormFieldType.Array]}
								onValueChange={(value) => {
									const attributeInstance = FieldAttributeClassMapper[value](attribute);
									setAttribute(['templateField'], {
										...attributeInstance,
										type: value,
									});
								}}
							/>
						),
					}}
					filterType="include"
					includeAttribute={[
						'id',
						'label',
						'labelWidth',
						'type',
						'validate',
						'hint',
						'hideLabel',
						'valueStyle',
						'labelStyle',
					]}
				/>
				<ComponentToRender
					attrPath={attrPath}
					attribute={attribute}
					onSetAttribute={(attributePath: (number | string)[], attributeValue: number | string | boolean) => {
						setAttribute(['templateField', ...attributePath], attributeValue);
					}}
				/>
			</>
		);
	};

	return <>{renderComponent()}</>;
}

export default TemplateAttributeComponent;
