import * as R from 'ramda';
import { atom, atomFamily, selectorFamily } from 'recoil';

import { Field, FormControl, FormState } from '../../types';

export const getFieldValueAtom = selectorFamily<string, string>({
	key: 'getFieldValueAtom',
	get:
		(id: string) =>
		({ get }) => {
			const formValues = get(formValuesAtom);
			return formValues?.[id];
		},
});

// 定義表單的value atom
export const formValuesAtom = atom<Record<string, any>>({
	key: 'formValuesAtom',
	default: {},
});

// 定義表單的state atom
export const formStatesAtom = atom<FormState>({
	key: 'formStatesAtom',
	default: {},
});

export const formDisabledAtom = atom<boolean>({
	key: 'formDisabledAtom',
	default: false,
});

// 單一 field 的 valueAtom
export const valueAtom = selectorFamily<any, (string | number)[]>({
	key: 'valueAtom',
	get:
		(valueChangedId: string[]) =>
		({ get }) => {
			const formValues = get(formValuesAtom);
			return R.path(valueChangedId, formValues) || '';
		},
});

// 使用selectorFamily來動態創建和formStatesAtom聯結的stateAtom
export const stateAtom = selectorFamily<any, (string | number)[]>({
	key: 'stateAtom',
	get:
		(valueChangedId: string[]) =>
		({ get }) => {
			const formStates = get(formStatesAtom);
			return R.path(valueChangedId, formStates);
		},
});

export const fieldStateAtom = atomFamily<FormControl, (string | number)[]>({
	key: 'fieldStateAtom',
	default: ([, defaultValue]) => {
		return {
			isDirty: false,
			isValid: true,
			errorMessage: '',
		};
	},
});

export const buttonActionMapAtom = atom<Record<string, (field: Field) => void>>({
	key: 'buttonActionMap',
	default: {},
});

export const structReportParseApiAtom = atom<string>({
	key: 'structReportParseApiAtom',
	default: '',
});
