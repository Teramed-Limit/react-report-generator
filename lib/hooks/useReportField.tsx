import React from 'react';

import * as R from 'ramda';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import { FieldAttributeClassMapper } from '../ISVReportGenerator/ReportDefine/Attribute/FieldAttributeClassMapper.ts';
import { fieldPathCollectionAtom } from '../recoil/atoms/formDefineAtoms.ts';
import {
	dragStateAtom,
	isFieldsetTemplateFocus,
	previousSelectedAttributePathAtom,
	selectedAttributeAtom,
	selectedAttributePathAtom,
	selectedAttributeTypeAtom,
	selectedDefineType,
	selectedFieldsAtom,
	selectedReportDefine,
} from '../recoil/atoms/report-generator-atoms.ts';
import { ArrayField } from '../types/field/array-field.ts';
import { CompositeField } from '../types/field/composite-field.ts';
import { Field } from '../types/field/field';
import { ParagraphField } from '../types/field/paragraph-field.ts';

interface Props {
	sectionIdx: number;
	subSectionIdx: number;
	fieldIdx: number;
	field: Field | ArrayField | CompositeField | ParagraphField;
}

export function useReportField({ sectionIdx, subSectionIdx, fieldIdx, field }: Props) {
	const path = ['sections', sectionIdx, 'subSections', subSectionIdx, 'fields', fieldIdx];
	const isFocus = useRecoilValue(isFieldsetTemplateFocus(path));

	const setAttributePath = useSetRecoilState(selectedAttributePathAtom);
	const setFormDefine = useSetRecoilState(selectedReportDefine);
	const setDragState = useSetRecoilState(dragStateAtom);

	// 函式來找到起始和結束路徑之間的所有fields陣列的路徑
	function findFieldPathsBetween(
		allFieldPaths: (string | number)[][],
		startPath: (string | number)[],
		endPath: (string | number)[],
	): (string | number)[][] {
		return allFieldPaths.filter(
			(fieldPath) => comparePaths(fieldPath, startPath) >= 0 && comparePaths(fieldPath, endPath) <= 0,
		);
	}

	// 用於比較兩個路徑的函數
	function comparePaths(path1: (string | number)[], path2: (string | number)[]): number {
		for (let i = 0; i < Math.min(path1.length, path2.length); i++) {
			if (path1[i] < path2[i]) return -1;
			if (path1[i] > path2[i]) return 1;
		}
		return 0;
	}

	const onSetAttributePath = useRecoilCallback(({ set, snapshot }) => async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		// Ctrl多選
		if (e.ctrlKey) {
			set(selectedFieldsAtom, (prev) => {
				const fieldPathList = new Set(prev);
				fieldPathList.add(JSON.stringify(path));
				return fieldPathList;
			});
		}
		// Shift多選
		else if (e.shiftKey) {
			// 使用 normalizedFieldPaths 來找出 startPath 和 endPath 之間的 fields
			const previousPath = await snapshot.getPromise(previousSelectedAttributePathAtom);
			const fieldPathCollection = await snapshot.getPromise(fieldPathCollectionAtom);
			const fieldPathList = findFieldPathsBetween(fieldPathCollection, previousPath, path);
			set(selectedFieldsAtom, new Set(fieldPathList.map((p) => JSON.stringify(p))));
		}
		// 單選
		else {
			set(selectedFieldsAtom, new Set<string>().add(JSON.stringify(path)));
			set(previousSelectedAttributePathAtom, path);
		}

		// 基於ReportDefine的路徑
		// 例如：['sections', 0, 'subsections', 0, 'fields', 0]
		set(selectedAttributePathAtom, path);
		const attributeInstance = FieldAttributeClassMapper[field.type](field);
		set(selectedAttributeAtom, attributeInstance);
		set(selectedAttributeTypeAtom, field.type);
		set(selectedDefineType, 'FormDefine');
	});

	const onDelete = (e) => {
		e.stopPropagation();
		setAttributePath([]);
		setFormDefine((prev) => R.dissocPath(path, prev));
	};

	const copyField = (e) => {
		e.stopPropagation();
		setFormDefine((prev) => {
			// 找到要複製的子部分
			const copiedField = R.path<Field>(path, prev);
			// 找到子部分列表的路徑
			const fieldListPath = R.dropLast(1, path);
			// 獲取子部分列表
			const fieldList = R.path<Field[]>(fieldListPath, prev);

			// 確保子部分列表和要複製的子部分存在
			if (!fieldList || !copiedField) return prev;

			// 更新複製子部分的 ID
			const updatedFields = {
				...copiedField,
				id: `Field${fieldList.length + 1}`,
			};
			// 插入新的子部分到列表
			const newFieldList = R.insert(fieldList.length, updatedFields, fieldList);

			return R.assocPath(fieldListPath, newFieldList, prev);
		});
	};

	const onDragStart = (e: React.DragEvent) => {
		e.stopPropagation();
		setDragState({
			isDragging: true,
			dragType: 'field',
			dragData: field,
			dragSourcePath: path,
		});
		e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'field', path, data: field }));
		e.dataTransfer.effectAllowed = 'move';
	};

	const onDragEnd = (e: React.DragEvent) => {
		e.stopPropagation();
		setDragState({
			isDragging: false,
			dragType: null,
			dragData: null,
			dragSourcePath: [],
		});
	};

	return { onSetAttributePath, onDelete, copyField, isFocus, onDragStart, onDragEnd };
}
