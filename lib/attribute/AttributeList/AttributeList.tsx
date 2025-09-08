import React, { useCallback, useMemo } from 'react';

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
	const isReactComponent = useCallback(
		(element: any): element is React.FC<any> => typeof element === 'function' && !React.isValidElement(element),
		[],
	);

	const isReactNode = useCallback((element: any): element is React.ReactNode => React.isValidElement(element), []);

	// 渲染輸入欄位
	const renderInput = useCallback(
		(value: any, key: string, pathList: (string | number)[]) => {
			// 根據值的型別找出對應的組件
			const RenderComponent = attributeComponentMapper?.[key] ?? AttributeMapper[typeof value];
			if (isReactComponent(RenderComponent)) {
				return (
					<AttributeColumn
						columnKey={key}
						value={value}
						pathList={pathList}
						setAttribute={setAttribute}
						RenderComponent={RenderComponent}
					/>
				);
			}
			if (isReactNode(RenderComponent)) {
				return <AttributeColumn columnKey={key}>{RenderComponent && RenderComponent}</AttributeColumn>;
			}
		},
		[attributeComponentMapper, isReactComponent, isReactNode, setAttribute],
	);

	// 渲染物件
	const renderObject = useCallback(
		(obj: any, parentPath: (string | number)[] = []) => {
			return Object.keys(obj).map((key) => {
				if (skipAttributes && skipAttributes.includes(key)) {
					return null;
				}

				const currentPath: (string | number)[] = Number.isNaN(+key)
					? [...parentPath, key]
					: [...parentPath, +key];
				const keyPath = currentPath.join('.');

				// 如果值是物件或陣列，則遞迴渲染
				if (typeof obj[key] === 'object' || Array.isArray(obj[key])) {
					let RenderAttributeComponent: any = AttributeList;

					if (attributeComponentMapper && attributeComponentMapper[key]) {
						if (isReactComponent(attributeComponentMapper[key])) {
							RenderAttributeComponent = attributeComponentMapper[key];
						} else if (isReactNode(attributeComponentMapper[key])) {
							return (
								<ExpandToggler
									key={keyPath}
									defaultExpanded={defaultExpanded}
									title={camelize(key) || key}
								>
									{attributeComponentMapper[key] as React.ReactNode}
								</ExpandToggler>
							);
						}
					}

					return (
						<ExpandToggler key={keyPath} defaultExpanded={defaultExpanded} title={camelize(key) || key}>
							<RenderAttributeComponent
								attrPath={currentPath}
								attribute={obj[key]}
								setAttribute={setAttribute}
							/>
						</ExpandToggler>
					);
				}

				return (
					<Box id={`attribute_${keyPath}`} key={keyPath}>
						{renderInput(obj[key], key, currentPath)}
					</Box>
				);
			});
		},
		[
			skipAttributes,
			attributeComponentMapper,
			isReactComponent,
			isReactNode,
			defaultExpanded,
			renderInput,
			setAttribute,
		],
	);

	// 使用 useMemo 緩存篩選後的屬性物件
	const processedAttribute = useMemo(() => {
		if (filterType === 'include' && includeAttribute) {
			return R.pick(includeAttribute, attribute);
		}
		if (filterType === 'exclude' && excludeAttribute) {
			return R.omit(excludeAttribute, attribute);
		}
		return attribute;
	}, [filterType, includeAttribute, excludeAttribute, attribute]);

	// 使用 useMemo 緩存最終渲染結果
	const renderedAttributes = useMemo(() => {
		return renderObject(processedAttribute, attrPath);
	}, [renderObject, processedAttribute, attrPath]);

	return (
		<>
			{/* 渲染標題 */}
			{title && (
				<Stack flexDirection="row" className={classes.title} justifyContent="space-between" alignItems="center">
					<Box sx={{ pl: 1 }}>{title}</Box>
					<Box>{toolbar}</Box>
				</Stack>
			)}
			{renderedAttributes}
		</>
	);
}

export default React.memo(AttributeList);
