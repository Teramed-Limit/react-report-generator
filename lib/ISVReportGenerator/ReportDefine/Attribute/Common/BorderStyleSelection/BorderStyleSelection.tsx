import React from 'react';

import BaseNativeSelection from '../../../../../UI/BaseNativeSelection/BaseNativeSelection.tsx';

interface Props {
	value: string;
	onValueChange: (val: string) => void;
}

function BorderStyleSelection({ value = '', onValueChange }: Props) {
	return (
		<BaseNativeSelection
			options={[
				{
					label: 'none',
					value: 'none',
				},
				{
					label: 'dashed',
					value: 'dashed',
				},
				{
					label: 'dotted',
					value: 'dotted',
				},
				{
					label: 'solid',
					value: 'solid',
				},
			]}
			value={value}
			onValueChange={onValueChange}
		/>
	);
}

export default BorderStyleSelection;
