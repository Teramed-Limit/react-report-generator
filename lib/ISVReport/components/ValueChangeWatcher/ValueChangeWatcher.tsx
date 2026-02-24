import { useEffect, useRef } from 'react';

import { useRecoilValue } from 'recoil';

import { getFieldValueAtom } from '../../../recoil/atoms/formDataAtoms.ts';

interface ValueChangeWatcherProps {
	fieldId: string;
	onChange: (value: unknown, fieldId: string) => void;
}

function ValueChangeWatcher({ fieldId, onChange }: ValueChangeWatcherProps) {
	const fieldValue = useRecoilValue(getFieldValueAtom(fieldId));

	const prevValueRef = useRef<unknown>(fieldValue);
	const isInitializedRef = useRef(false);

	useEffect(() => {
		if (!isInitializedRef.current) {
			isInitializedRef.current = true;
			prevValueRef.current = fieldValue;
			return;
		}

		if (prevValueRef.current === fieldValue) return;

		prevValueRef.current = fieldValue;
		onChange(fieldValue, fieldId);
	}, [fieldValue, fieldId, onChange]);

	return null;
}

export default ValueChangeWatcher;
