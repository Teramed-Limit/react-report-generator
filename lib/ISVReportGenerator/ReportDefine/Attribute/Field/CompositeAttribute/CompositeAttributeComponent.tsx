import React from 'react';

import * as R from 'ramda';
import { useRecoilCallback } from 'recoil';

import AttributeList from '../../../../../attribute/AttributeList/AttributeList.tsx';
import { FormFieldType } from '../../../../../field/field-type.ts';
import { selectedAttributeAtom, selectedReportDefine } from '../../../../../recoil/atoms/report-generator-atoms.ts';
import { TextField } from '../../../../../types/field/text-field.ts';
import OrientationSelection from '../../Common/OrientationSelection/OrientationSelection';
import { FieldAttributeClassMapper } from '../../FieldAttributeClassMapper.ts';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps.tsx';
import { CompositeAttributeClass } from './CompositeAttributeClass.ts';
import CompositeFieldsAttributeComponent from './CompositeFieldsAttribute/CompositeFieldsAttributeComponent.tsx';

function CompositeAttributeComponent({
	attrPath,
	attribute,
	onSetAttribute,
}: FieldAttributeComponentProps<CompositeAttributeClass>) {
	// 新增CompositeField內的Field
	const addField = useRecoilCallback(({ snapshot, set }) => () => {
		let newAttribute = attribute;
		if (!attribute.fields) newAttribute = new CompositeAttributeClass(attribute);

		const newField: TextField = FieldAttributeClassMapper[FormFieldType.Text]({
			id: `${newAttribute.id}_Child${newAttribute.fields.length + 1}`,
			type: FormFieldType.Text,
			label: `label`,
			orientation: 'row',
		});

		const compositeFields = R.insert(newAttribute.fields.length, newField, newAttribute.fields);

		const currentReportDefine = snapshot.getLoadable(selectedReportDefine).contents;
		const updatedReportDefine = R.assocPath([...attrPath, 'fields'], compositeFields, currentReportDefine);

		set(selectedReportDefine, updatedReportDefine);
		set(selectedAttributeAtom, R.path([...attrPath, 'fields'].slice(0, 6), updatedReportDefine));
	});

	// 刪除CompositeField內的Field
	const deleteField = useRecoilCallback(({ snapshot, set }) => (index: number) => {
		const compositeFields = R.remove(index, 1, attribute.fields);

		const currentReportDefine = snapshot.getLoadable(selectedReportDefine).contents;
		const updatedReportDefine = R.assocPath([...attrPath, 'fields'], compositeFields, currentReportDefine);

		set(selectedReportDefine, updatedReportDefine);
		set(selectedAttributeAtom, R.path([...attrPath, 'fields'].slice(0, 6), updatedReportDefine));
	});

	return (
		<>
			<AttributeList
				defaultExpanded={false}
				attribute={new CompositeAttributeClass(attribute)}
				setAttribute={onSetAttribute}
				includeAttribute={['compositeOrientation', 'fields']}
				filterType="include"
				attributeComponentMapper={{
					compositeOrientation: OrientationSelection,
					fields: (
						<CompositeFieldsAttributeComponent
							attrPath={[...attrPath, 'fields']}
							attribute={attribute.fields}
							onSetAttribute={onSetAttribute}
							addField={addField}
							deleteField={deleteField}
						/>
					),
				}}
			/>
		</>
	);
}

export default CompositeAttributeComponent;
