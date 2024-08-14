import React from 'react';

import BaseNativeSelection from '../../../../../UI/BaseNativeSelection/BaseNativeSelection.tsx';

interface Props {
	value: string;
	onValueChange: (val: string) => void;
}

function FontStyleSelection({ value = '', onValueChange }: Props) {
	return (
		<BaseNativeSelection
			options={[
				{
					label: 'Normal',
					value: 'normal',
				},
			]}
			value={value}
			onValueChange={onValueChange}
		/>
	);
}

export default FontStyleSelection;
