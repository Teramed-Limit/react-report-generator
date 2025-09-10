import React from 'react';

import * as R from 'ramda';
import { useRecoilCallback, useSetRecoilState } from 'recoil';

import { LayoutType } from '../field/field-type.ts';
import { SubSectionAttributeClass } from '../ISVReportGenerator/ReportDefine/Attribute/Layout/SubSectionAttribute/SubSectionAttributeClass.tsx';
import {
	dragStateAtom,
	selectedAttributeAtom,
	selectedAttributePathAtom,
	selectedAttributeTypeAtom,
	selectedDefineType,
	selectedReportDefine,
	selectedSubSectionsAtom,
} from '../recoil/atoms/report-generator-atoms.ts';
import { SubSection } from '../types/define.ts';
import { useFocusState } from './useFocusState.tsx';

interface Props {
	sectionIdx: number;
	subSectionIdx: number;
	subSection: SubSection;
}

export function useReportSubSection({ sectionIdx, subSectionIdx, subSection }: Props) {
	const path = ['sections', sectionIdx, 'subSections', subSectionIdx];
	const { isFocus, setActive } = useFocusState(path);

	const setFormDefine = useSetRecoilState(selectedReportDefine);
	const setDragState = useSetRecoilState(dragStateAtom);

	// 使用 useRecoilCallback 批量更新 + 專門的 focus hook
	const onSetAttributePath = useRecoilCallback(({ set }) => (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		// 處理多選邏輯
		if (e.ctrlKey) {
			set(selectedSubSectionsAtom, (prev) => {
				const subSectionPathList = new Set(prev);
				subSectionPathList.add(JSON.stringify(path));
				return subSectionPathList;
			});
		} else {
			set(selectedSubSectionsAtom, new Set<string>().add(JSON.stringify(path)));
		}

		// 批量設置所有狀態
		set(selectedAttributePathAtom, path);
		const attributeInstance = new SubSectionAttributeClass(subSection);
		set(selectedAttributeAtom, attributeInstance);
		set(selectedAttributeTypeAtom, LayoutType.SubSection);
		set(selectedDefineType, 'FormDefine');

		// 設置 focus 狀態
		setActive();
	});

	const onDelete = useRecoilCallback(({ set }) => (e: React.MouseEvent) => {
		e.stopPropagation();
		set(selectedAttributePathAtom, []);
		set(selectedReportDefine, (prev) => R.dissocPath(path, prev));
	});

	const copySubSection = useRecoilCallback(({ set }) => (e: React.MouseEvent) => {
		e.stopPropagation();
		set(selectedReportDefine, (prev) => {
			// 找到要複製的 subsection
			const copiedSubSection = R.path<SubSection>(path, prev);
			// 找到 subsection 列表的路徑
			const subSectionListPath = R.dropLast(1, path);
			// 獲取 subsection 列表
			const subSectionList = R.path<SubSection[]>(subSectionListPath, prev);

			// 確保列表和要複製的 subsection 存在
			if (!subSectionList || !copiedSubSection) return prev;

			// 更新複製 subsection 的 ID
			const updatedSubSection = {
				...copiedSubSection,
				id: `SubSection${subSectionList.length + 1}`,
			};
			// 插入新的 subsection 到列表
			const newSubSectionList = R.insert(subSectionList.length, updatedSubSection, subSectionList);

			return R.assocPath(subSectionListPath, newSubSectionList, prev);
		});
	});

	const onDragStart = (e: React.DragEvent) => {
		e.stopPropagation();
		setDragState({
			isDragging: true,
			dragType: 'subsection',
			dragData: subSection,
			dragSourcePath: path,
		});
		e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'subsection', path, data: subSection }));
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

	return {
		onSetAttributePath,
		onDelete,
		copySubSection,
		isFocus,
		onDragStart,
		onDragEnd,
	};
}
