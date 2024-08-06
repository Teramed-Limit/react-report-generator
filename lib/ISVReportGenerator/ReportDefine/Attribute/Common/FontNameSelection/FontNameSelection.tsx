import React from 'react';

import { Font } from '@react-pdf/renderer';

import BaseNativeSelection from '../../../../../UI/BaseNativeSelection/BaseNativeSelection';

interface Props {
	value: string;
	onValueChange: (val: string) => void;
}

function FontNameSelection({ value = '', onValueChange }: Props) {
	const options = Object.keys(Font.getRegisteredFonts()).map((key) => ({
		label: key,
		value: key,
	}));

	return <BaseNativeSelection options={options} value={value} onValueChange={onValueChange} />;
}

export default FontNameSelection;
