import React from 'react';

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
	const RenderComponent = fieldMapper[field.type];

	if (!RenderComponent) {
		// console.error(`${JSON.stringify(field)} settings error`);
		return <></>;
	}

	return (
		<>
			<RenderComponent id={id} disabled={!modifiable} field={field} value={value} onValueChange={onValueChange} />
		</>
	);
}

export default FieldDynamicRenderer;
