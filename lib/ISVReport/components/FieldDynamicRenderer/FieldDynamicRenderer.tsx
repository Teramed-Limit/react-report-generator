import React, { useMemo } from 'react';

import { Field } from '../../../types/field/field.ts';

interface Props {
	id: string;
	field: Field;
	fieldMapper: { [key: string]: React.ComponentType<any> };
	value: any;
	modifiable: boolean;
	onValueChange?: (value: any) => void;
}

function FieldDynamicRenderer({ id, field, fieldMapper, value, modifiable, onValueChange }: Props) {
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
		}),
		[id, modifiable, field, value, onValueChange],
	);

	if (!RenderComponent) {
		// console.error(`${JSON.stringify(field)} settings error`);
		return <></>;
	}

	return <RenderComponent {...componentProps} />;
}

// 使用 React.memo 並提供自定義比較函數，只有當實際需要的 props 改變時才重新渲染
export default React.memo(FieldDynamicRenderer, (prevProps, nextProps) => {
	// 只比較會影響渲染的關鍵屬性
	return (
		prevProps.id === nextProps.id &&
		prevProps.field.type === nextProps.field.type &&
		prevProps.value === nextProps.value &&
		prevProps.modifiable === nextProps.modifiable &&
		prevProps.onValueChange === nextProps.onValueChange &&
		// 對 field 進行深度比較關鍵屬性
		prevProps.field.id === nextProps.field.id &&
		prevProps.field.label === nextProps.field.label &&
		prevProps.field.readOnly === nextProps.field.readOnly &&
		JSON.stringify(prevProps.field.validate) === JSON.stringify(nextProps.field.validate)
	);
});
