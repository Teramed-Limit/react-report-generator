import React from 'react';

import classes from './AttributeColumn.module.scss';

export interface Props {
	columnKey: string;
	children?: React.ReactNode;
	value?: any;
	pathList?: (string | number)[];
	setAttribute?: (pathList: (string | number)[], value: any) => void;
	RenderComponent?: React.ComponentType<any>;
}

function AttributeColumn({ columnKey, children, value, pathList, setAttribute, RenderComponent }: Props) {
	// 如果提供了組件相關的 props，就在這裡穩定處理
	const stableChildren = React.useMemo(() => {
		if (RenderComponent && setAttribute && pathList !== undefined && value !== undefined) {
			const handleValueChange = (val: any) => setAttribute(pathList, val);
			return <RenderComponent value={value} onValueChange={handleValueChange} />;
		}
		return children;
	}, [RenderComponent, value, pathList, setAttribute, children]);

	return (
		<div className={classes.attributeColumn} key={columnKey}>
			<div className={classes.attributeName}>{columnKey}</div>
			<div className={classes.attributeValue}>{stableChildren}</div>
		</div>
	);
}

// 自定義比較函數來檢查 AttributeColumn 重新渲染原因
const propsComparison = (prevProps: Props, nextProps: Props): boolean => {
	const columnKeyChanged = prevProps.columnKey !== nextProps.columnKey;
	const childrenChanged = prevProps.children !== nextProps.children;
	const valueChanged = prevProps.value !== nextProps.value;
	const pathListChanged = JSON.stringify(prevProps.pathList) !== JSON.stringify(nextProps.pathList);
	const setAttributeChanged = prevProps.setAttribute !== nextProps.setAttribute;
	const renderComponentChanged = prevProps.RenderComponent !== nextProps.RenderComponent;

	const hasChanged =
		columnKeyChanged ||
		childrenChanged ||
		valueChanged ||
		pathListChanged ||
		setAttributeChanged ||
		renderComponentChanged;

	if (hasChanged) {
		// console.group('🔄 AttributeColumn Re-render');
		// console.log('Column key:', nextProps.columnKey);
		// console.log('Key changed:', columnKeyChanged);
		// console.log('Children changed:', childrenChanged);
		// console.log('Value changed:', valueChanged);
		// console.log('PathList changed:', pathListChanged);
		// console.log('SetAttribute changed:', setAttributeChanged);
		// console.log('RenderComponent changed:', renderComponentChanged);
		// console.groupEnd();
		return false;
	}

	return true;
};

export default React.memo(AttributeColumn, propsComparison);
