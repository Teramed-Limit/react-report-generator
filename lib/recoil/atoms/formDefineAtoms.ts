import { atom, selector, selectorFamily } from 'recoil';

import { FormFieldType } from '../../field/field-type.ts';
import { Field, FieldMetaInfo, FormDefine } from '../../types';
import { ArrayField } from '../../types/field/array-field.ts';
import { CompositeField } from '../../types/field/composite-field.ts';
import { SRTextField } from '../../types/field/sr-text-field.ts';
import { isFieldMetaInfo } from '../../utils/general.ts';

export const formDefineAtom = atom<FormDefine>({
	key: 'formDefineAtom',
	default: { sections: [] },
});

export const imageDefineAtom = atom<Field[]>({
	key: 'imageDefineAtom',
	default: [],
});

export const fieldCollectionAtom = selector<Record<string, FieldMetaInfo | Record<string, FieldMetaInfo>>>({
	key: 'fieldCollectionAtom',
	get: ({ get }) => {
		const formDefine = get(formDefineAtom);
		const fieldAttributePathCollection = {};

		formDefine.sections.forEach((section, sectionIdx) => {
			section.subSections.forEach((subSection, subSectionIdx) => {
				subSection.fields.forEach((field, fieldIdx) => {
					// Composite
					if (field.type === FormFieldType.Composite) {
						(field as CompositeField).fields.forEach((innerCompositeField, innerIdx) => {
							const path = [
								'sections',
								sectionIdx,
								'subSections',
								subSectionIdx,
								'fields',
								fieldIdx,
								'fields',
								innerIdx,
							];
							fieldAttributePathCollection[innerCompositeField.id] = {
								path,
								field: innerCompositeField,
							};
						});
					}
					// Array
					else if (field.type === FormFieldType.Array) {
						const { templateField } = field as ArrayField;
						fieldAttributePathCollection[field.id] = {};
						if (templateField.type === FormFieldType.Composite) {
							const tempField = {};
							(templateField as CompositeField).fields.forEach((innerCompositeField, innerIdx) => {
								const path = [
									'sections',
									sectionIdx,
									'subSections',
									subSectionIdx,
									'fields',
									fieldIdx,
									'templateField',
									'fields',
									innerIdx,
								];
								tempField[innerCompositeField.id] = {
									path,
									field: innerCompositeField,
								};
							});
							fieldAttributePathCollection[field.id] = tempField;
						} else {
							const path = [
								'sections',
								sectionIdx,
								'subSections',
								subSectionIdx,
								'fields',
								fieldIdx,
								'templateField',
							];
							fieldAttributePathCollection[field.id] = { path, templateField };
						}
					}
					// Normal Field
					else {
						const path = ['sections', sectionIdx, 'subSections', subSectionIdx, 'fields', fieldIdx];
						fieldAttributePathCollection[field.id] = { path, field };
					}
				});
			});
		});

		return fieldAttributePathCollection;
	},
});

export const srFieldsAtom = selector<Record<string, SRTextField>>({
	key: 'srFieldsAtom',
	get: ({ get }) => {
		const formDefine = get(formDefineAtom);
		if (formDefine.sections === undefined) return {};

		return formDefine.sections.reduce((acc, section) => {
			section.subSections.forEach((subSection) => {
				subSection.fields.forEach((field) => {
					if (field.type === FormFieldType.Composite) {
						(field as CompositeField).fields.forEach((innerCompositeField) => {
							if (innerCompositeField.type === FormFieldType.SRText) {
								acc[innerCompositeField.id] = { ...innerCompositeField };
							}
						});
					} else if (field.type === FormFieldType.Array) {
						const arrayField = field as ArrayField;
						if (arrayField.templateField.type === FormFieldType.Composite) {
							(arrayField.templateField as CompositeField).fields.forEach((innerCompositeField) => {
								if (innerCompositeField.type === FormFieldType.SRText) {
									acc[innerCompositeField.id] = { ...innerCompositeField };
								}
							});
						} else if (arrayField.type === FormFieldType.SRText) {
							acc[arrayField.id] = { ...field };
						}
					} else if (field.type === FormFieldType.SRText) {
						acc[field.id] = { ...field };
					}
				});
			});
			return acc;
		}, {});
	},
});

export const fieldPathAtom = selectorFamily<(string | number)[], string>({
	key: 'fieldPathAtom',
	get:
		(id: string) =>
		({ get }) => {
			const fieldAttributePathCollection = get(fieldCollectionAtom);
			if (isFieldMetaInfo(fieldAttributePathCollection[id])) {
				return fieldAttributePathCollection[id].path as (string | number)[];
			}
			return [];
		},
});

export const fieldPathCollectionAtom = selector({
	key: 'fieldPathCollectionAtom',
	get: ({ get }) => {
		const formDefine = get(fieldCollectionAtom);
		const normalizedPaths: (string | number)[][] = [];

		Object.keys(formDefine).forEach((key) => {
			if (isFieldMetaInfo(formDefine[key])) {
				const metaInfo = formDefine[key] as FieldMetaInfo;
				normalizedPaths.push(metaInfo.path);
			}
		});

		return normalizedPaths;
	},
});
