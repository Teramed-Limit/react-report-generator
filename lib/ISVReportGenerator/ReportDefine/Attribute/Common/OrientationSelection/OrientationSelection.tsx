import React from 'react';

import BaseNativeSelection from '../../../../../UI/BaseNativeSelection/BaseNativeSelection';

interface Props {
	value: string;
	onValueChange: (val: string) => void;
}

function OrientationSelection({ value = '', onValueChange }: Props) {
	return (
		<BaseNativeSelection
			options={[
				{ label: 'Row', value: 'row' },
				{ label: 'Column', value: 'column' },
			]}
			value={value}
			onValueChange={onValueChange}
		/>
	);
}

export default OrientationSelection;
