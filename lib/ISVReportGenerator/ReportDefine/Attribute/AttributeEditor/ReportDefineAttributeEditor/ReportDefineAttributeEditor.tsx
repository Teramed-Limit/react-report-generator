import React from 'react';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Stack } from '@mui/material';
import * as R from 'ramda';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import AttributeList from '../../../../../attribute/AttributeList/AttributeList.tsx';
import { FormFieldType, LayoutType } from '../../../../../field/field-type.ts';
import { useReportLayout } from '../../../../../hooks/useReportLayout.ts';
import {
	selectedAttributeAtom,
	selectedAttributePathAtom,
	selectedAttributeTypeAtom,
	selectedFieldsAtom,
	selectedReportDefine,
} from '../../../../../recoil/atoms/report-generator-atoms.ts';
import ReportCSSStyleAttribute from '../../Common/Complex/ReportCSSStyleAttribute/ReportCSSStyleAttribute.tsx';
import ReportValidateAttribute from '../../Common/Complex/ReportValidateAttribute/ReportValidateAttribute.tsx';
import OrientationSelection from '../../Common/OrientationSelection/OrientationSelection.tsx';
import PercentageNumber from '../../Common/PercentageNumber/PercentageNumber.tsx';
import { ArrayAttributeClass } from '../../Field/ArrayAttribute/ArrayAttributeClass.ts';
import { BaseAttributeClass } from '../../Field/BaseAttribute/BaseAttributeClass.ts';
import BaseAttributeComponent from '../../Field/BaseAttribute/BaseAttributeComponent.tsx';
import { CompositeAttributeClass } from '../../Field/CompositeAttribute/CompositeAttributeClass.ts';
import { ParagraphAttributeClass } from '../../Field/ParagraphAttribute/ParagraphAttributeClass.ts';
import { FieldAttributeComponentMapper } from '../../FieldAttributeComponentMapper.tsx';
import { FieldAttributeComponentProps } from '../../FieldAttributeComponentProps.tsx';

import classes from './ReportDefineAttributeEditor.module.scss';

function ReportDefineAttributeEditor() {
	const attributePath = useRecoilValue(selectedAttributePathAtom);
	const attributeType = useRecoilValue(selectedAttributeTypeAtom);
	const [attribute, setAttribute] = useRecoilState(selectedAttributeAtom);
	const selectedFields = useRecoilValue(selectedFieldsAtom);
	const setFormDefine = useSetRecoilState(selectedReportDefine);
	const { moveEntity, copyEntity, deleteEntity } = useReportLayout(attributePath, 'Field');

	const onSetAttribute = (attrPath: (number | string)[], attrValue: number | string | boolean) => {
		setAttribute((pre) => R.assocPath(attrPath, attrValue, pre));
		setFormDefine((pre) => {
			return R.assocPath([...attributePath, ...attrPath], attrValue, pre);
		});
	};

	// 定義渲染元件的函數
	const renderComponent = (type: string | undefined, props: FieldAttributeComponentProps<any>) => {
		if (!type) return null;

		const ComponentToRender = FieldAttributeComponentMapper[type];
		if (!ComponentToRender) return null;

		let renderAttribute:
			| BaseAttributeClass
			| CompositeAttributeClass
			| ArrayAttributeClass
			| ParagraphAttributeClass = new BaseAttributeClass(attribute || {});
		if (ComponentToRender) {
			switch (type) {
				case LayoutType.Page:
				case LayoutType.Section:
				case LayoutType.SubSection:
					return <ComponentToRender {...props} />;
				case FormFieldType.Composite:
					renderAttribute = new CompositeAttributeClass(attribute);
					break;
				case FormFieldType.Array:
					renderAttribute = new ArrayAttributeClass(attribute);
					break;
				case FormFieldType.Paragraph:
					renderAttribute = new ParagraphAttributeClass(attribute);
					break;
				default:
					renderAttribute = new BaseAttributeClass(attribute);
					break;
			}
		}
		return (
			<>
				<BaseAttributeComponent
					attrPath={attributePath}
					attribute={renderAttribute}
					onSetAttribute={onSetAttribute}
					toolbar={
						<>
							<IconButton size="small" color="secondary" onClick={() => moveEntity(-1)}>
								<ArrowUpwardIcon />
							</IconButton>
							<IconButton size="small" color="secondary" onClick={() => moveEntity(1)}>
								<ArrowDownwardIcon />
							</IconButton>
							<IconButton size="small" color="primary" onClick={copyEntity}>
								<ContentCopyIcon />
							</IconButton>
							<IconButton size="small" color="error" onClick={deleteEntity}>
								<DeleteIcon />
							</IconButton>
						</>
					}
				/>
				<ComponentToRender {...props} />
			</>
		);
	};

	const onSetMultipleFieldsAttribute = (attrPath: (number | string)[], attrValue: number | string | boolean) => {
		setAttribute((pre: any) => R.assocPath(attrPath, attrValue, pre));
		setFormDefine((pre) => {
			let newValues = { ...pre };
			selectedFields.forEach((fieldPath) => {
				newValues = R.assocPath([...JSON.parse(fieldPath), ...attrPath], attrValue, newValues);
			});
			return newValues;
		});
	};

	const renderCommonFieldAttribute = () => {
		return (
			<AttributeList
				title={attribute.id}
				defaultExpanded={false}
				attribute={attribute}
				setAttribute={onSetMultipleFieldsAttribute}
				attributeComponentMapper={{
					orientation: OrientationSelection,
					validate: ReportValidateAttribute,
					labelWidth: PercentageNumber,
					labelStyle: ReportCSSStyleAttribute,
					valueStyle: ReportCSSStyleAttribute,
				}}
				filterType="include"
				includeAttribute={[
					// 'type',
					'orientation',
					'hideLabel',
					'readOnly',
					'validate',
					'labelWidth',
					'labelStyle',
					'valueStyle',
				]}
			/>
		);
	};

	return (
		<Stack
			direction="column"
			sx={{ border: selectedFields.size >= 1 ? '1px solid darkgrey' : 'none', minWidth: '300px' }}
			className={classes.container}
		>
			{selectedFields.size === 1
				? renderComponent(attributeType, {
						attrPath: attributePath,
						attribute,
						onSetAttribute,
					})
				: renderCommonFieldAttribute()}
		</Stack>
	);
}

export default React.memo(ReportDefineAttributeEditor);
