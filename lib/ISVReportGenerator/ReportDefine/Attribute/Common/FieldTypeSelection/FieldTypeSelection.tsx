import React from 'react';

import BaseNativeSelection from '../../../../../UI/BaseNativeSelection/BaseNativeSelection.tsx';
import { FieldAttributeClassMapper } from '../../FieldAttributeClassMapper.ts';

interface Props {
	value: string;
	onValueChange: (val: string) => void;
	exclude?: string[];
}

function FieldTypeSelection({ value = '', exclude, onValueChange }: Props) {
	const onSetAttributePath = (val) => {
		onValueChange(val);
	};

	const options = Object.keys(FieldAttributeClassMapper).filter((k) => !exclude?.includes(k));
	const optionKeys: { label: string; value: string }[] = [];
	options.forEach((key) => {
		optionKeys.push({ label: key, value: key });
	});

	return <BaseNativeSelection options={optionKeys} value={value} onValueChange={onSetAttributePath} />;
}

export default FieldTypeSelection;
