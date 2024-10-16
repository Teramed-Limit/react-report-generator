import React from 'react';

import BaseNativeSelection from '../../../../../UI/BaseNativeSelection/BaseNativeSelection';

interface Props {
	value: string;
	onValueChange: (val: string) => void;
}

function FontNameSelection({ value = '', onValueChange }: Props) {
	return (
		<BaseNativeSelection
			options={[
				{
					label: 'Microsoft JhengHei',
					value: 'Microsoft JhengHei',
				},
				{
					label: 'Arial',
					value: 'Arial',
				},
				{
					label: 'Roboto',
					value: 'Roboto',
				},
				{
					label: 'Noto Sans TC',
					value: 'Noto Sans TC',
				},
			]}
			value={value}
			onValueChange={onValueChange}
		/>
	);
}

export default FontNameSelection;
