import React from 'react';

import { Stack } from '@mui/material';
import * as R from 'ramda';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import {
	selectedAttributeAtom,
	selectedAttributePathAtom,
	selectedAttributeTypeAtom,
	selectedReportImageDefine,
} from '../../../../recoil/atoms/report-generator-atoms.ts';
import { BaseAttributeClass } from '../Field/BaseAttribute/BaseAttributeClass.ts';
import BaseAttributeComponent from '../Field/BaseAttribute/BaseAttributeComponent.tsx';
import { FieldAttributeComponentMapper } from '../FieldAttributeComponentMapper.tsx';
import { FieldAttributeComponentProps } from '../FieldAttributeComponentProps.tsx';
import classes from './ImageAttributeEditor.module.scss';

function ImageAttributeEditor() {
	const attributePath = useRecoilValue(selectedAttributePathAtom);
	const attributeType = useRecoilValue(selectedAttributeTypeAtom);
	const [attribute, setAttribute] = useRecoilState(selectedAttributeAtom);
	const setImageDefine = useSetRecoilState(selectedReportImageDefine);

	const onSetAttribute = (attrPath: (number | string)[], attrValue: number | string | boolean) => {
		setAttribute((pre) => R.assocPath(attrPath, attrValue, pre));
		setImageDefine((pre) => {
			return R.assocPath([...attributePath, ...attrPath], attrValue, pre);
		});
	};

	// 定義渲染元件的函數
	const renderComponent = (type: string | undefined, props: FieldAttributeComponentProps<any>) => {
		if (!type) return null;

		const ComponentToRender = FieldAttributeComponentMapper[type];
		if (!ComponentToRender) return null;
		const renderAttribute: BaseAttributeClass = new BaseAttributeClass(attribute);
		return (
			<>
				<BaseAttributeComponent
					attrPath={attributePath}
					attribute={renderAttribute}
					onSetAttribute={onSetAttribute}
				/>
				<ComponentToRender {...props} />
			</>
		);
	};

	return (
		<Stack direction="column" className={classes.container}>
			{renderComponent(attributeType, {
				attrPath: attributePath,
				attribute,
				onSetAttribute,
			})}
		</Stack>
	);
}

export default ImageAttributeEditor;
