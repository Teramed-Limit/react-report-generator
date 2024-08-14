import * as R from 'ramda';
import { atom, selector } from 'recoil';

import { ReportComponentType } from '../../types/report-generator/component/rep-component.ts';
import { RepComponentAttribute } from '../../types/report-generator/rep-attribute.ts';
import { RepPage } from '../../types/report-generator/rep-page.ts';

export const initRepPage = (name): RepPage => ({
	name,
	width: 595,
	height: 100,
	paddingBottom: 0,
	paddingLeft: 0,
	paddingRight: 0,
	paddingTop: 0,
	components: {},
});

export const headerDefineAtom = atom<RepPage>({
	key: 'headerDefineAtom',
	default: initRepPage('Header'),
});

export const footerDefineAtom = atom<RepPage>({
	key: 'footerDefineAtom',
	default: initRepPage('Footer'),
});

export const activePageAtom = atom<string>({
	key: 'activePageAtom',
	default: 'header',
});

export const activePageAttributeAtom = selector<RepPage>({
	key: 'activePageAttributeAtom',
	get: ({ get }) => {
		const activePage = get(activePageAtom);
		return activePage === 'header' ? get(headerDefineAtom) : get(footerDefineAtom);
	},
	set: ({ get, set }, newValue: RepPage) => {
		const activePage = get(activePageAtom);
		return activePage === 'header' ? set(headerDefineAtom, newValue) : set(footerDefineAtom, newValue);
	},
});

export const activeCompAttributeAtom = selector<RepComponentAttribute>({
	key: 'activeCompAttributeAtom',
	get: ({ get }) => {
		const activePage = get(activePageAttributeAtom);
		const activeUUid = get(activeUidAtom);
		return R.path(['components', activeUUid], activePage) as RepComponentAttribute;
	},
	set: ({ get, set }, newValue: RepComponentAttribute) => {
		const activePage = get(activePageAttributeAtom);
		const activeUUid = get(activeUidAtom);
		set(activePageAttributeAtom, R.assocPath(['components', activeUUid], newValue, activePage));
	},
});

export const activeUidAtom = atom<string>({
	key: 'activeUidAtom',
	default: '',
});

export const createRepCompTypeAtom = atom<ReportComponentType>({
	key: 'createRepCompTypeAtom',
	default: ReportComponentType.General,
});
