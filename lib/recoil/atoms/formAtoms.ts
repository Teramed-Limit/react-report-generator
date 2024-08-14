import * as R from 'ramda';
import { atom, selector, selectorFamily } from 'recoil';

import { Field } from '../../types/field/field.ts';
import { FilterCondition, OptionSource } from '../../types/field/selection-field.ts';
import { FormState } from '../../types/form-state.ts';

// const validationService = new ValidationService();
// const reportDataService = new ReportDataService();

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
export const valueAtom = selectorFamily<any, any>({
	key: 'valueAtom',
	get:
		({ field, valueChangedId }: { field: Field; valueChangedId: string[] }) =>
		({ get }) => {
			const formValues = get(formValuesAtom);
			return R.path(valueChangedId, formValues) || '';
		},
});

// 使用selectorFamily來動態創建和formStatesAtom聯結的stateAtom
export const stateAtom = selectorFamily<any, any>({
	key: 'stateAtom',
	get:
		({ field, valueChangedId }: { field: Field; valueChangedId: string[] }) =>
		({ get }) => {
			const formStates = get(formStatesAtom);
			return formStates[field.id];
		},
});

export const codeListMapAtom = atom<Record<string, any[]>>({
	key: 'codeListMapAtom',
	default: {},
});

export const codeListKeyAtom = selector<string[]>({
	key: 'codeListKeyAtom',
	get: ({ get }) => {
		const codeListMap = get(codeListMapAtom);
		return Object.keys(codeListMap);
	},
});

export const codeListAtom = selectorFamily<any[], any>({
	key: 'codeListAtom',
	get:
		({ optionSource, filterCondition }: { optionSource: OptionSource; filterCondition: FilterCondition }) =>
		({ get }) => {
			const codeListMap = get(codeListMapAtom);
			const codeList = codeListMap[optionSource.source];

			if (!codeList) return [];
			if (filterCondition && filterCondition?.filterById) {
				const { filterById, filterOptionKey } = filterCondition;
				const formData = get(formValuesAtom);
				const filterStr = (formData[filterById] as string) || '';
				return codeList.filter((option) => option[filterOptionKey] === filterStr);
			}

			return codeListMap[optionSource.source];
		},
	set:
		({ optionSource, filterCondition }: { optionSource: OptionSource; filterCondition: FilterCondition }) =>
		({ get, set }, newState) => {
			const codeListMap = get(codeListMapAtom);
			set(codeListMapAtom, {
				...codeListMap,
				[optionSource.source]: newState,
			});
		},
});

export const buttonActionMapAtom = atom<Record<string, (field: Field) => void>>({
	key: 'buttonActionMap',
	default: {},
});
