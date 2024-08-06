import React from 'react';

import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import * as R from 'ramda';

import BaseCheckbox from '../../UI/BaseCheckbox/BaseCheckbox.tsx';
import BaseNumber from '../../UI/BaseNumber/BaseNumber.tsx';
import BaseTextInput from '../../UI/BaseTextInput/BaseTextInput.tsx';
import ExpandToggler from '../../UI/ExpandToggler/ExpandToggler.tsx';
import { camelize } from '../../utils/general.ts';
import AttributeColumn from '../AttributeColumn/AttributeColumn';
import classes from './AttributeList.module.scss';

// 建立一個對應表，把型別對應到對應的組件
const AttributeMapper = {
	number: BaseNumber,
	string: BaseTextInput,
	boolean: BaseCheckbox,
};

// 屬性定義
export interface Props {
	title?: string;
	defaultExpanded?: boolean;
	attrPath?: (string | number)[];
	attribute: any;
	attributeComponentMapper?: { [key: string]: React.FC<any> | React.ReactNode };
	filterType?: 'include' | 'exclude' | 'none';
	includeAttribute?: string[];
	excludeAttribute?: string[];
	skipAttributes?: string[];
	setAttribute: (attrName: (string | number)[], attrValue: any) => void;
	toolbar?: React.ReactNode;
}

function AttributeList({
	title,
	attrPath = [],
	attribute,
	defaultExpanded = true,
	attributeComponentMapper,
	filterType = 'none',
	includeAttribute,
	excludeAttribute,
	skipAttributes,
	setAttribute,
	toolbar,
}: Props) {
	const isReactComponent = (element: any): element is React.FC<any> =>
		typeof element === 'function' && !React.isValidElement(element);

	const isReactNode = (element: any): element is React.ReactNode => React.isValidElement(element);

	// 渲染輸入欄位
	const renderInput = (value: any, key: string, pathList: (string | number)[]) => {
		// 根據值的型別找出對應的組件
		const RenderComponent = attributeComponentMapper?.[key] ?? AttributeMapper[typeof value];
		if (isReactComponent(RenderComponent)) {
			return (
				<AttributeColumn columnKey={key}>
					{RenderComponent && (
						<RenderComponent
							value={value}
							onValueChange={(val: any) => {
								// 輸入值改變時，呼叫setAttribute
								setAttribute(pathList, val);
							}}
						/>
					)}
				</AttributeColumn>
			);
		}
		if (isReactNode(RenderComponent)) {
			return <AttributeColumn columnKey={key}>{RenderComponent && RenderComponent}</AttributeColumn>;
		}
	};

	// 渲染物件
	const renderObject = (obj: any, parentPath: (string | number)[] = []) => {
		return Object.keys(obj).map((key) => {
			if (skipAttributes && skipAttributes.includes(key)) {
				return null;
			}

			const currentPath: (string | number)[] = Number.isNaN(+key) ? [...parentPath, key] : [...parentPath, +key];

			// 如果值是物件或陣列，則遞迴渲染
			if (typeof obj[key] === 'object' || Array.isArray(obj[key])) {
				let RenderAttributeComponent: any = AttributeList;

				if (attributeComponentMapper && attributeComponentMapper[key]) {
					if (isReactComponent(attributeComponentMapper[key])) {
						RenderAttributeComponent = attributeComponentMapper[key];
					} else if (isReactNode(attributeComponentMapper[key])) {
						return (
							<ExpandToggler
								key={currentPath.join('.')}
								defaultExpanded={defaultExpanded}
								title={camelize(key) || key}
							>
								{attributeComponentMapper[key] as React.ReactNode}
							</ExpandToggler>
						);
					}
				}

				return (
					<ExpandToggler
						key={currentPath.join('.')}
						defaultExpanded={defaultExpanded}
						title={camelize(key) || key}
					>
						<RenderAttributeComponent
							attrPath={currentPath}
							attribute={obj[key]}
							setAttribute={setAttribute}
						/>
					</ExpandToggler>
				);
			}

			return (
				<Box id={`attribute_${currentPath.join('.')}`} key={currentPath.join('.')}>
					{renderInput(obj[key], key, currentPath)}
				</Box>
			);
		});
	};

	// 渲染標題
	const renderTitle = () => {
		return (
			<>
				{title && (
					<Stack
						flexDirection="row"
						className={classes.title}
						justifyContent="space-between"
						alignItems="center"
					>
						<Box sx={{ pl: 1 }}>{title}</Box>
						<Box>{toolbar}</Box>
					</Stack>
				)}
			</>
		);
	};

	// 根據篩選類型決定如何渲染
	const renderFilteredAttributes = () => {
		if (filterType === 'include' && includeAttribute) {
			return renderObject(R.pick(includeAttribute, attribute), attrPath);
		}
		if (filterType === 'exclude' && excludeAttribute) {
			return renderObject(R.omit(excludeAttribute, attribute), attrPath);
		}
		return renderObject(attribute, attrPath);
	};

	return (
		<>
			{renderTitle()}
			{renderFilteredAttributes()}
		</>
	);
}

export default React.memo(AttributeList);
