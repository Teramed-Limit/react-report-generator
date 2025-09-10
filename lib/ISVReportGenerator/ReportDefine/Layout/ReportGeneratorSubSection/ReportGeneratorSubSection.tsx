import React, { CSSProperties } from 'react';

import { Box, Chip } from '@mui/material';
import { Style } from '@react-pdf/types/style';
import * as R from 'ramda';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { FormFieldType } from '../../../../field/field-type.ts';
import { useReportSubSection } from '../../../../hooks/useReportSubSection.tsx';
import { reportSubsection } from '../../../../ISVReport/style.ts';
import { dragStateAtom, selectedReportDefine } from '../../../../recoil/atoms/report-generator-atoms.ts';
import { SubSection } from '../../../../types/define.ts';
import { ArrayField } from '../../../../types/field/array-field.ts';
import { CompositeField } from '../../../../types/field/composite-field.ts';
import { Field } from '../../../../types/field/field.ts';
import { ParagraphField } from '../../../../types/field/paragraph-field.ts';
import BoxInspector from '../../../../UI/BoxInspector/BoxInspector.tsx';
import FieldsetTemplate from '../FieldsetTemplate/FieldsetTemplate';
import ReportGeneratorInputArrayField from '../ReportGeneratorInputArrayField/ReportGeneratorInputArrayField.tsx';
import ReportGeneratorInputCompositeField from '../ReportGeneratorInputCompositeField/ReportGeneratorInputCompositeField.tsx';
import ReportGeneratorInputFieldContainer from '../ReportGeneratorInputFieldContainer/ReportGeneratorInputFieldContainer';
import ReportGeneratorInputParagraphField from '../ReportGeneratorInputParagraphField/ReportGeneratorInputParagraphField.tsx';

interface Props {
	sectionIdx: number;
	subSectionIdx: number;
	subSection: SubSection;
	showGuideLine: boolean;
}

function ReportGeneratorSubSection({ sectionIdx, subSectionIdx, subSection, showGuideLine }: Props) {
	const dragState = useRecoilValue(dragStateAtom);
	const { onSetAttributePath, onDelete, copySubSection, isFocus, onDragStart, onDragEnd } = useReportSubSection({
		sectionIdx,
		subSectionIdx,
		subSection,
	});

	// 處理接收 field 的 drop
	const onDrop = useRecoilCallback(({ set, snapshot }) => async (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();

		try {
			const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));

			// 只接受 field 類型的拖拉
			if (dragData.type !== 'field') {
				return;
			}

			const currentFormDefine = await snapshot.getPromise(selectedReportDefine);
			const sourceField = dragData.data;
			const sourcePath = dragData.path;

			// 移除來源的 field
			const withoutSource = R.dissocPath(sourcePath, currentFormDefine);

			// 添加到目標 subsection 的 fields
			const targetFieldsPath = ['sections', sectionIdx, 'subSections', subSectionIdx, 'fields'];
			const targetFields = R.path<any[]>(targetFieldsPath, withoutSource) || [];
			const updatedFields = [...targetFields, sourceField];

			const finalFormDefine = R.assocPath(targetFieldsPath, updatedFields, withoutSource);

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
		// 只在拖拉 field 時允許 drop
		if (dragState.dragType === 'field') {
			e.preventDefault();
			e.dataTransfer.dropEffect = 'move';
		}
	};

	const style = subSection?.style as Style;

	return (
		<FieldsetTemplate
			id={subSection.id}
			style={{
				...reportSubsection,
				maxWidth: subSection?.maxWidth,
				width: subSection?.maxWidth,
				opacity: subSection?.hide || subSection?.hideInPDF ? 0.4 : 1,
			}}
			showGuideLine={showGuideLine}
			isFocus={isFocus}
			legendComp={
				<Chip
					sx={{ cursor: 'pointer', maxWidth: '100%' }}
					size="small"
					color="secondary"
					label={subSection.id}
				/>
			}
			onClick={onSetAttributePath}
			draggable
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onDrop={onDrop}
			onDragOver={onDragOver}
			isDragTarget={dragState.dragType === 'field'}
		>
			<BoxInspector
				paddingTop={style?.paddingTop || '0'}
				paddingBottom={style?.paddingBottom || '0'}
				paddingLeft={style?.paddingLeft || '0'}
				paddingRight={style?.paddingRight || '0'}
				marginTop={style?.marginTop || '0'}
				marginBottom={style?.marginBottom || '0'}
				marginLeft={style?.marginLeft || '0'}
				marginRight={style?.marginRight || '0'}
			>
				<Box
					style={
						{
							...reportSubsection,
							...((subSection?.style || {}) as CSSProperties),
						} as CSSProperties
					}
				>
					{subSection.fields.map((field, idx) => {
						switch (field.type) {
							case FormFieldType.Composite:
								return (
									<ReportGeneratorInputCompositeField
										key={field.id}
										sectionIdx={sectionIdx}
										subSectionIdx={subSectionIdx}
										fieldIdx={idx}
										field={field as CompositeField}
										showGuideLine={showGuideLine}
									/>
								);
							case FormFieldType.Array:
								return (
									<ReportGeneratorInputArrayField
										key={field.id}
										sectionIdx={sectionIdx}
										subSectionIdx={subSectionIdx}
										fieldIdx={idx}
										field={field as ArrayField}
										showGuideLine={showGuideLine}
									/>
								);
							case FormFieldType.Paragraph:
								return (
									<ReportGeneratorInputParagraphField
										key={field.id}
										sectionIdx={sectionIdx}
										subSectionIdx={subSectionIdx}
										fieldIdx={idx}
										field={field as ParagraphField}
										showGuideLine={showGuideLine}
									/>
								);
							default:
								return (
									<ReportGeneratorInputFieldContainer
										key={field.id}
										sectionIdx={sectionIdx}
										subSectionIdx={subSectionIdx}
										fieldIdx={idx}
										field={field as Field}
										showGuideLine={showGuideLine}
									/>
								);
						}
					})}
				</Box>
			</BoxInspector>
		</FieldsetTemplate>
	);
}

export default React.memo(ReportGeneratorSubSection);
