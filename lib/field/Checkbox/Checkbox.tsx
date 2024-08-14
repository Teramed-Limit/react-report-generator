import React from 'react';

import { CheckboxField } from '../../types/field/checkbox-field.ts';
import BaseCheckbox from '../../UI/BaseCheckbox/BaseCheckbox.tsx';

interface Props {
	id: string;
	field: CheckboxField;
	value: string;
	onValueChange: (value: string | number | boolean) => void;
	disabled: boolean;
}

function Checkbox({ id, field, value, onValueChange, disabled }: Props) {
	const onChecked = (isCheck: boolean) => {
		if (field.valueType === 'boolean') {
			onValueChange(isCheck);
		} else if (field.valueType === 'number') {
			onValueChange(isCheck ? 1 : 0);
		} else {
			onValueChange(isCheck ? '1' : '0');
		}
	};

	return (
		<BaseCheckbox
			id={id}
			disabled={disabled || field.readOnly}
			label={field.checkboxLabel}
			value={!!+value}
			onValueChange={onChecked}
		/>
	);
}

export default Checkbox;
