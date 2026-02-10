import React, { useMemo } from 'react';

import { Field } from '../../../types/field/field.ts';

interface Props {
	id: string;
	field: Field;
	fieldMapper: { [key: string]: React.ComponentType<any> };
	value: any;
	modifiable: boolean;
	onValueChange?: (value: any) => void;
	onGetFieldValue?: (path: (string | number)[]) => any;
	onFieldValueChange?: (path: (string | number)[], value: any) => void;
}

function FieldDynamicRenderer({
	id,
	field,
	fieldMapper,
	value,
	modifiable,
	onValueChange,
	onGetFieldValue,
	onFieldValueChange,
}: Props) {
	// 記憶化組件選擇，避免每次都重新查找
	const RenderComponent = useMemo(() => fieldMapper[field.type], [fieldMapper, field.type]);

	// 記憶化 props，只有當真正需要的值改變時才重新創建
	const componentProps = useMemo(
		() => ({
			id,
			disabled: !modifiable,
			field,
			value,
			onValueChange,
			onGetFieldValue,
			onFieldValueChange,
		}),
		[id, modifiable, field, value, onValueChange, onGetFieldValue, onFieldValueChange],
	);

	if (!RenderComponent) {
		// console.error(`${JSON.stringify(field)} settings error`);
		return <></>;
	}

	return <RenderComponent {...componentProps} />;
}

// 使用 React.memo 並提供自定義比較函數，只有當實際需要的 props 改變時才重新渲染
export default React.memo(FieldDynamicRenderer);
