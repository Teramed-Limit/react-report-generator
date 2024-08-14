import { atom, selector, selectorFamily } from 'recoil';

import { LayoutType } from '../../field/field-type.ts';
import { FormDefine } from '../../types/define';
import { Field } from '../../types/field/field.ts';
import { ReportComponentType } from '../../types/report-generator/component/rep-component.ts';
import { SRTreeNode } from '../../types/sr-tree.ts';

export const formDefineAtom = atom<FormDefine>({
	key: 'formDefineAtom',
	default: { sections: [] },
});

export const normalizedFieldsAtom = selector({
	key: 'normalizedFieldsAtom',
	get: ({ get }) => {
		const formDefine = get(formDefineAtom);
		const normalizedFields = {};

		formDefine.sections.forEach((section, sectionIdx) => {
			section.subSections.forEach((subSection, subSectionIdx) => {
				subSection.fields.forEach((field, fieldIdx) => {
					normalizedFields[field.id] = [
						'sections',
						sectionIdx,
						'subSections',
						subSectionIdx,
						'fields',
						fieldIdx,
					];
				});
			});
		});

		return normalizedFields;
	},
});

export const fieldPathSelectorAtom = selectorFamily({
	key: 'fieldDefineSelectorAtom',
	get:
		(id: string) =>
		({ get }) => {
			const normalizedField = get(normalizedFieldsAtom);
			return normalizedField[id];
		},
});

export const normalizedFieldPathsSelectorJson = selector({
	key: 'normalizedFieldPathsSelectorJson',
	get: ({ get }) => {
		const formDefine = get(formDefineAtom);
		const normalizedPaths: (string | number)[][] = [];

		formDefine.sections.forEach((section, sectionIdx) => {
			section.subSections.forEach((subSection, subSectionIdx) => {
				subSection.fields.forEach((_, fieldIdx) => {
					const fieldPath = ['sections', sectionIdx, 'subSections', subSectionIdx, 'fields', fieldIdx];
					normalizedPaths.push(fieldPath);
				});
			});
		});

		return JSON.stringify(normalizedPaths);
	},
});

export const normalizedFieldPathsSelector = selector({
	key: 'normalizedFieldsSelector',
	get: ({ get }) => {
		return JSON.parse(get(normalizedFieldPathsSelectorJson));
	},
});

export const imageDefineAtom = atom<FormDefine>({
	key: 'imageDefineAtom',
	default: { sections: [] },
});

export const selectedDefineType = atom<'FormDefine' | 'ImageDefine'>({
	key: 'report-generator-define-type',
	default: 'FormDefine',
});

export const selectedReportDefine = selector<FormDefine>({
	key: 'selectedReportDefineAtom',
	get: ({ get }) => {
		const activePage = get(selectedDefineType);
		return activePage === 'FormDefine' ? get(formDefineAtom) : get(imageDefineAtom);
	},
	set: ({ get, set }, newValue: FormDefine) => {
		const activePage = get(selectedDefineType);
		return activePage === 'FormDefine' ? set(formDefineAtom, newValue) : set(imageDefineAtom, newValue);
	},
});

export const selectedReportImageDefine = atom<Field[]>({
	key: 'report-generator-image-define',
	default: [],
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
