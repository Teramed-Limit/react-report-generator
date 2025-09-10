import React from 'react';

import * as R from 'ramda';
import { useRecoilCallback, useSetRecoilState } from 'recoil';

import { LayoutType } from '../field/field-type.ts';
import { SectionAttributeClass } from '../ISVReportGenerator/ReportDefine/Attribute/Layout/SectionAttribute/SectionAttributeClass.tsx';
import {
	dragStateAtom,
	selectedAttributeAtom,
	selectedAttributePathAtom,
	selectedAttributeTypeAtom,
	selectedDefineType,
	selectedReportDefine,
	selectedSectionsAtom,
} from '../recoil/atoms/report-generator-atoms.ts';
import { Section } from '../types/define.ts';
import { useFocusState } from './useFocusState.tsx';

interface Props {
	sectionIdx: number;
	section: Section;
}

export function useReportSection({ sectionIdx, section }: Props) {
	const path = ['sections', sectionIdx];
	const { isFocus, setActive } = useFocusState(path);

	const setFormDefine = useSetRecoilState(selectedReportDefine);
	const setDragState = useSetRecoilState(dragStateAtom);

	const onSetAttributePath = useRecoilCallback(({ set }) => (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		// 處理多選邏輯
		if (e.ctrlKey) {
			set(selectedSectionsAtom, (prev) => {
				const sectionPathList = new Set(prev);
				sectionPathList.add(JSON.stringify(path));
				return sectionPathList;
			});
		} else {
			set(selectedSectionsAtom, new Set<string>().add(JSON.stringify(path)));
		}

		// 批量設置所有狀態
		set(selectedAttributePathAtom, path);
		const attributeInstance = new SectionAttributeClass(section);
		set(selectedAttributeAtom, attributeInstance);
		set(selectedAttributeTypeAtom, LayoutType.Section);
		set(selectedDefineType, 'FormDefine');

		// 設置 focus 狀態
		setActive();
	});

	const onDelete = useRecoilCallback(({ set }) => (e: React.MouseEvent) => {
		e.stopPropagation();
		set(selectedAttributePathAtom, []);
		set(selectedReportDefine, (prev) => R.dissocPath(path, prev));
	});

	const copySection = useRecoilCallback(({ set }) => (e: React.MouseEvent) => {
		e.stopPropagation();
		set(selectedReportDefine, (prev) => {
			// 找到要複製的 section
			const copiedSection = R.path<Section>(path, prev);
			// 找到 section 列表的路徑
			const sectionListPath = R.dropLast(1, path);
			// 獲取 section 列表
			const sectionList = R.path<Section[]>(sectionListPath, prev);

			// 確保列表和要複製的 section 存在
			if (!sectionList || !copiedSection) return prev;

			// 更新複製 section 的 ID
			const updatedSection = {
				...copiedSection,
				id: `Section${sectionList.length + 1}`,
			};
			// 插入新的 section 到列表
			const newSectionList = R.insert(sectionList.length, updatedSection, sectionList);

			return R.assocPath(sectionListPath, newSectionList, prev);
		});
	});

	const onDragStart = (e: React.DragEvent) => {
		e.stopPropagation();
		setDragState({
			isDragging: true,
			dragType: 'section',
			dragData: section,
			dragSourcePath: path,
		});
		e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'section', path, data: section }));
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

	const onDrop = useRecoilCallback(({ set, snapshot }) => async (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();

		try {
			const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));

			// 只接受 subsection 類型的拖拉
			if (dragData.type !== 'subsection') {
				return;
			}

			const currentFormDefine = await snapshot.getPromise(selectedReportDefine);
			const sourceSubSection = dragData.data;
			const sourcePath = dragData.path;

			// 移除來源的 subsection
			const withoutSource = R.dissocPath(sourcePath, currentFormDefine);

			// 添加到目標 section 的 subSections
			const targetSubSectionsPath = [...path, 'subSections'];
			const targetSubSections = R.path<any[]>(targetSubSectionsPath, withoutSource) || [];
			const updatedSubSections = [...targetSubSections, sourceSubSection];

			const finalFormDefine = R.assocPath(targetSubSectionsPath, updatedSubSections, withoutSource);

			set(selectedReportDefine, finalFormDefine);
			
			// 重置拖拽狀態，確保跨容器拖拽時狀態正確
			set(dragStateAtom, {
				isDragging: false,
				dragType: null,
				dragData: null,
				dragSourcePath: [],
			});
		} catch (error) {
			console.error('Drop operation failed:', error);
			// 錯誤時也要重置拖拽狀態
			set(dragStateAtom, {
				isDragging: false,
				dragType: null,
				dragData: null,
				dragSourcePath: [],
			});
		}
	});

	const onDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	};

	return {
		onSetAttributePath,
		onDelete,
		copySection,
		isFocus,
		onDragStart,
		onDragEnd,
		onDrop,
		onDragOver,
	};
}
