import React from 'react';

import BaseNativeSelection from '../../../../../UI/BaseNativeSelection/BaseNativeSelection';

interface Props {
	value: string;
	onValueChange: (val: number) => void;
}

function FontWeightSelection({ value = '', onValueChange }: Props) {
	return (
		<BaseNativeSelection
			options={[
				{ label: 'Normal', value: 400 },
				{ label: 'Bold', value: 600 },
			]}
			value={value}
			onValueChange={onValueChange}
		/>
	);
}

export default FontWeightSelection;
