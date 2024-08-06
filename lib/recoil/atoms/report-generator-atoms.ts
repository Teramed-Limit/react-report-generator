import { atom, selector, selectorFamily } from 'recoil';

import { LayoutType } from '../../field/field-type.ts';
import { Field, FormDefine, SRTreeNode } from '../../types';
import { ReportComponentType } from '../../types/report-generator/component/rep-component.ts';
import { formDefineAtom, imageDefineAtom } from './formDefineAtoms.ts';

export const selectedDefineType = atom<'FormDefine' | 'ImageDefine'>({
	key: 'selectedDefineType',
	default: 'FormDefine',
});

export const selectedReportDefine = selector<FormDefine | Field[]>({
	key: 'selectedReportDefineAtom',
	get: ({ get }) => {
		const activePage = get(selectedDefineType);
		return activePage === 'FormDefine' ? get(formDefineAtom) : get(imageDefineAtom);
	},
	set: ({ get, set }, newValue: FormDefine | Field[]) => {
		const activePage = get(selectedDefineType);
		return activePage === 'FormDefine' ? set(formDefineAtom, newValue) : set(imageDefineAtom, newValue);
	},
});

export const selectedAttributeAtom = atom<any>({
	key: 'report-generator-attribute',
	default: {},
});

// 基於ReportDefine的路徑
// 例如：['sections', 0, 'subsections', 0, 'fields', 0]
export const selectedAttributePathAtom = atom<(string | number)[]>({
	key: 'report-generator-attribute-path',
	default: [],
});

export const previousSelectedAttributePathAtom = atom<(string | number)[]>({
	key: 'previous-report-generator-attribute-path',
	default: [],
});

export const selectedFieldsAtom = atom<Set<string>>({
	key: 'report-generator-selected-fields',
	default: new Set(),
});

export const isFieldsetTemplateFocus = selectorFamily<boolean, (string | number)[]>({
	key: 'isFieldsetTemplateFocus',
	get:
		(path: (string | number)[]) =>
		({ get }) => {
			const selectedFieldList = get(selectedFieldsAtom);
			return selectedFieldList.has(JSON.stringify(path));
		},
	set:
		(path: (string | number)[]) =>
		({ set, get }, isMulti) => {
			const attrType = get(selectedAttributeTypeAtom);
			if (attrType !== LayoutType.Page && attrType !== LayoutType.Section && attrType !== LayoutType.SubSection) {
				set(previousSelectedAttributePathAtom, path);
			}

			set(selectedAttributePathAtom, path);
			set(selectedFieldsAtom, new Set<string>().add(JSON.stringify(path)));
		},
});

export const selectedAttributeTypeAtom = atom<string | undefined>({
	key: 'report-generator-attribute-type',
	default: undefined,
});

export const reportSelectedToolAtom = atom<ReportComponentType>({
	key: 'reportSelectedToolAtom',
	default: ReportComponentType.General,
});

export const structureReportAtom = atom<SRTreeNode | undefined>({
	key: 'structureReportAtom',
	default: undefined,
});
