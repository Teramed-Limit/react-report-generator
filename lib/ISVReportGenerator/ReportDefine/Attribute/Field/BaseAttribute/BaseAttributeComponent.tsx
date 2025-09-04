import React from 'react';

import { useSetRecoilState } from 'recoil';

import AttributeList from '../../../../../attribute/AttributeList/AttributeList.tsx';
import { selectedAttributeTypeAtom } from '../../../../../recoil/atoms/report-generator-atoms.ts';
import ReportButtonBarAttribute from '../../Common/Complex/ReportButtonBarAttribute/ReportButtonBarAttribute';
import ReportCSSStyleAttribute from '../../Common/Complex/ReportCSSStyleAttribute/ReportCSSStyleAttribute';
import ReportValidateAttribute from '../../Common/Complex/ReportValidateAttribute/ReportValidateAttribute';
import FieldTypeSelection from '../../Common/FieldTypeSelection/FieldTypeSelection';
import OrientationSelection from '../../Common/OrientationSelection/OrientationSelection';
import PercentageNumber from '../../Common/PercentageNumber/PercentageNumber';
import { FieldAttributeClassMapper } from '../../FieldAttributeClassMapper.ts';
import { ArrayAttributeClass } from '../ArrayAttribute/ArrayAttributeClass.ts';
import { CompositeAttributeClass } from '../CompositeAttribute/CompositeAttributeClass.ts';

import { ParagraphAttributeClass } from '../ParagraphAttribute/ParagraphAttributeClass.ts';
import { BaseAttributeClass } from './BaseAttributeClass.ts';

interface Props {
	title?: string;
	attrPath: (number | string)[];
	attribute: BaseAttributeClass | CompositeAttributeClass | ArrayAttributeClass | ParagraphAttributeClass;
	onSetAttribute: (attrPath: (number | string)[], attrValue: number | string | boolean) => void;
	children?: React.ReactNode;
	toolbar?: React.ReactNode;
}

function BaseAttributeComponent({ title, attrPath, attribute, onSetAttribute, children, toolbar }: Props) {
	const setAttributeType = useSetRecoilState(selectedAttributeTypeAtom);

	return (
		<>
			<AttributeList
				title={attribute.id}
				defaultExpanded={false}
				attribute={attribute}
				setAttribute={onSetAttribute}
				attributeComponentMapper={{
					orientation: OrientationSelection,
					type: (
						<FieldTypeSelection
							value={attribute.type}
							onValueChange={(value) => {
								const attributeInstance = FieldAttributeClassMapper[value](attribute);
								onSetAttribute([], { ...attributeInstance, type: value });
								setAttributeType(value);
							}}
						/>
					),
					validate: ReportValidateAttribute,
					labelWidth: PercentageNumber,
					labelStyle: ReportCSSStyleAttribute,
					valueStyle: ReportCSSStyleAttribute,
					buttonBar: ReportButtonBarAttribute,
				}}
				filterType="exclude"
				excludeAttribute={[
					'fromModal',
					'compositeOrientation',
					'fields',
					'templateField',
					'arrayOrientation',
					'text',
				]}
				toolbar={toolbar}
			/>
			{children}
		</>
	);
}

export default BaseAttributeComponent;
