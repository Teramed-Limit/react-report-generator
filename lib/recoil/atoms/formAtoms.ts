import { atom, selectorFamily } from 'recoil';

import { Field } from '../../types/field/field.ts';
import { FilterCondition, OptionSource } from '../../types/field/selection-field.ts';

// 定義表單的value atom
export const formValuesAtom = atom<Record<string, any>>({
	key: 'formValuesAtom',
	default: {},
});

// 定義表單的state atom
export const formStatesAtom = atom<Record<string, any>>({
	key: 'formStatesAtom',
	default: {},
});

export const formDisabledAtom = atom<boolean>({
	key: 'formDisabledAtom',
	default: false,
});

// 使用selectorFamily來動態創建和formValuesAtom聯結的valueAtom
export const valueAtom = selectorFamily<any, any>({
	key: 'valueAtom',
	get:
		(field: Field) =>
		({ get }) => {
			const formValues = get(formValuesAtom);
			return formValues[field.id];
		},
	set:
		(field: Field) =>
		({ get, set }, newValue) => {
			const formValues = get(formValuesAtom);
			set(formValuesAtom, {
				...formValues,
				[field.id]: newValue,
			});
		},
});

// 使用selectorFamily來動態創建和formStatesAtom聯結的stateAtom
export const stateAtom = selectorFamily<any, any>({
	key: 'stateAtom',
	get:
		(field: Field) =>
		({ get }) => {
			const formStates = get(formStatesAtom);
			return formStates[field.id];
		},
	set:
		(field: Field) =>
		({ get, set }, newState) => {
			const formStates = get(formStatesAtom);
			set(formStatesAtom, {
				...formStates,
				[field.id]: newState,
			});
		},
});

export const codeListMapAtom = atom<Record<string, any[]>>({
	key: 'codeListMapAtom',
	default: {},
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
