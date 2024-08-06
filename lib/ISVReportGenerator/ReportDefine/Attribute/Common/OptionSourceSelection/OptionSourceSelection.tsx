import React from 'react';

import { useRecoilValue } from 'recoil';

import { codeListKeyAtom } from '../../../../../recoil/atoms/codeListAtom';
import BaseNativeSelection from '../../../../../UI/BaseNativeSelection/BaseNativeSelection';

interface Props {
	value: string;
	onValueChange: (val: string) => void;
}

function OptionSourceSelection({ value = '', onValueChange }: Props) {
	const codeListKey = useRecoilValue(codeListKeyAtom);
	const optionKeys: { label: string; value: string }[] = [];
	codeListKey.forEach((key) => {
		optionKeys.push({ label: key, value: key });
	});

	return <BaseNativeSelection options={optionKeys} value={value} onValueChange={onValueChange} />;
}

export default OptionSourceSelection;
