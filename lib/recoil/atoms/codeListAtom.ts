import { atom, selector, selectorFamily } from 'recoil';

import { FilterCondition, OptionSource } from '../../types/field/selection-field.ts';

import { formValuesAtom } from './formDataAtoms.ts';

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
