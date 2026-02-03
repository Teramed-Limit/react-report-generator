import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

import { Box, Button, Stack, ThemeProvider } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import { codeListMapAtom } from '../recoil/atoms/codeListAtom.ts';
import { formValuesAtom } from '../recoil/atoms/formDataAtoms.ts';
import { formDefineAtom, imageDefineAtom } from '../recoil/atoms/formDefineAtoms.ts';
import { footerDefineAtom, headerDefineAtom } from '../recoil/atoms/header-footer-defineAtom.ts';
import { selectedDefineType } from '../recoil/atoms/report-generator-atoms.ts';
import '../styles/scrollbar.scss';
import { rootTheme } from '../theme/rootTheme.ts';
import { Field, FormDefine, RepPage } from '../types';
import { ISVReportGeneratorHandle } from '../types/component-handle';

import classes from './ISVReportGenerator.module.scss';
import ReportPropertyPanel from './ReportComponent/Layout/ReportPropertyPanel/ReportPropertyPanel.tsx';
import ReportPage from './ReportComponent/Page/ReportPage';
import ImageDefineAttributeEditor from './ReportDefine/Attribute/AttributeEditor/ImageDefineAttributeEditor/ImageDefineAttributeEditor.tsx';
import ReportDefineAttributeEditor from './ReportDefine/Attribute/AttributeEditor/ReportDefineAttributeEditor/ReportDefineAttributeEditor.tsx';
import UniversalFontStyle from './ReportDefine/Component/UniversalFontStyle/UniversalFontStyle';
import ReportGeneratorImagePage from './ReportDefine/Layout/ReportGeneratorImagePage/ReportGeneratorImagePage.tsx';
import ReportGeneratorPage from './ReportDefine/Layout/ReportGeneratorPage/ReportGeneratorPage.tsx';

interface Props {
	formData?: Record<string, any>;
	formDefine: FormDefine;
	imageDefine: Field[];
	headerDefine: RepPage;
	footerDefine: RepPage;
	codeList: Record<string, any[]>;
}

export const ISVReportGenerator = forwardRef<ISVReportGeneratorHandle, Props>(
	({ formData, formDefine, imageDefine, headerDefine, footerDefine, codeList }: Props, ref) => {
		// Report Form
		const [showGuideLine, onToggleGuideline] = useState<boolean>(true);
		const setFormData = useSetRecoilState(formValuesAtom);
		const setFormDefine = useSetRecoilState(formDefineAtom);
		const setImageDefine = useSetRecoilState(imageDefineAtom);
		const defineType = useRecoilValue(selectedDefineType);
		const setCodeListMap = useSetRecoilState(codeListMapAtom);
		const [fitPageWidth, setFitPageWidth] = useState<boolean>(false);

		useEffect(() => {
			setCodeListMap(codeList);
		}, [codeList, setCodeListMap]);

		useEffect(() => {
			setFormDefine(formDefine);
			setImageDefine(imageDefine);
		}, [formDefine, imageDefine, setFormDefine, setImageDefine]);

		// Report Page
		const setHeaderDefine = useSetRecoilState(headerDefineAtom);
		const setFooterDefine = useSetRecoilState(footerDefineAtom);

		useEffect(() => {
			setFormData(formData);
		}, [formData, setFormData]);

		useEffect(() => {
			setHeaderDefine(headerDefine);
			setFooterDefine(footerDefine);
		}, [headerDefine, footerDefine, setHeaderDefine, setFooterDefine]);

		const getFormData = useRecoilCallback(
			({ snapshot }) =>
				() => {
					return snapshot.getLoadable(formValuesAtom).contents;
				},
			[],
		);

		const getFormDefine = useRecoilCallback(
			({ snapshot }) =>
				() => {
					return snapshot.getLoadable(formDefineAtom).contents;
				},
			[],
		);

		const getImageDefine = useRecoilCallback(
			({ snapshot }) =>
				() => {
					return snapshot.getLoadable(imageDefineAtom).contents;
				},
			[],
		);

		const getHeaderDefine = useRecoilCallback(
			({ snapshot }) =>
				() => {
					return snapshot.getLoadable(headerDefineAtom).contents;
				},
			[],
		);

		const getFooterDefine = useRecoilCallback(
			({ snapshot }) =>
				() => {
					return snapshot.getLoadable(footerDefineAtom).contents;
				},
			[],
		);

		useImperativeHandle(ref, () => ({
			getFormData: () => getFormData(),
			getFormDefine: () => getFormDefine(),
			getImageDefine: () => getImageDefine(),
			getHeaderDefine: () => getHeaderDefine(),
			getFooterDefine: () => getFooterDefine(),
		}));

		// 優化版本：只在需要時創建新對象，減少不必要的對象創建
		const updateStyleInPlace = useCallback(
			<T,>(obj: T, styleName: string, styleValue: string | number, target: string): T => {
				if (Array.isArray(obj)) {
					return obj.map((item) => updateStyleInPlace(item, styleName, styleValue, target)) as unknown as T;
				}

				if (typeof obj !== 'object' || obj === null) {
					return obj;
				}

				const hasTarget = target in obj && obj[target as keyof T] !== undefined;
				let hasNestedChanges = false;

				// 使用 reduce 來處理嵌套對象
				const processedEntries = Object.entries(obj).reduce<[string, unknown][]>((acc, [key, value]) => {
					if (key === target) {
						acc.push([key, value]);
						return acc;
					}

					if (typeof value === 'object' && value !== null) {
						const updatedValue = updateStyleInPlace(value, styleName, styleValue, target);
						if (updatedValue !== value) {
							hasNestedChanges = true;
							acc.push([key, updatedValue]);
						} else {
							acc.push([key, value]);
						}
					} else {
						acc.push([key, value]);
					}
					return acc;
				}, []);

				// 如果沒有 target 屬性且沒有嵌套變更，直接返回原對象
				if (!hasTarget && !hasNestedChanges) {
					return obj;
				}

				// 創建新對象
				const result = Object.fromEntries(processedEntries) as T;

				// 更新 target 屬性
				if (hasTarget) {
					result[target as keyof T] = {
						...(obj[target as keyof T] as object),
						[styleName]: styleValue,
					} as T[keyof T];
				}

				return result;
			},
			[],
		);

		const setGlobalStyle = useCallback(
			(styleName: string, styleValue: string | number, target: string) => {
				setFormDefine((prev) => updateStyleInPlace<FormDefine>(prev, styleName, styleValue, target));
				setImageDefine((prev) => updateStyleInPlace<Field[]>(prev, styleName, styleValue, target));
			},
			[setFormDefine, setImageDefine, updateStyleInPlace],
		);

		return (
			<ThemeProvider theme={rootTheme}>
				<Stack direction="row" spacing={2} className={classes.reportContainer}>
					{/* Attribute Editor */}
					{defineType === 'FormDefine' ? <ReportDefineAttributeEditor /> : <ImageDefineAttributeEditor />}
					{/* </Stack> */}
					<Stack direction="column" spacing="4px">
						{/* Global Attribute Editor */}
						<Box className={classes.toolbar}>
							<FormControlLabel
								control={
									<Switch
										size="small"
										color="secondary"
										checked={showGuideLine}
										onChange={(event) => onToggleGuideline(event.target.checked)}
									/>
								}
								label="Show Guide Line"
							/>
							<Button
								sx={{ marginLeft: '10px' }}
								size="small"
								variant="contained"
								color="primary"
								onClick={() => {
									const sides = ['Top', 'Bottom', 'Left', 'Right'];
									const properties = ['margin', 'padding', 'border'];
									const styles = ['style', 'labelStyle', 'valueStyle'];
									properties.forEach((property) => {
										sides.forEach((side) => {
											styles.forEach((style) => {
												setGlobalStyle(`${property}${side}`, 0, style);
											});
										});
									});
								}}
							>
								Remove Spacing
							</Button>
							<Button
								sx={{ marginLeft: '10px' }}
								size="small"
								variant="contained"
								color="primary"
								onClick={() => {
									setFitPageWidth(!fitPageWidth);
								}}
							>
								Expand width to 100%
							</Button>
						</Box>

						<Stack className={classes.sticky} direction="row" spacing="20px">
							<UniversalFontStyle
								title="Universal Label Style"
								setStyle={(styleName: string, styleValue: any) =>
									setGlobalStyle(styleName, styleValue, 'labelStyle')
								}
							/>
							<UniversalFontStyle
								title="Universal Value Style"
								setStyle={(styleName: string, styleValue: any) =>
									setGlobalStyle(styleName, styleValue, 'valueStyle')
								}
							/>
						</Stack>
						{/* Report */}
						<Box className={classes.reportLayout}>
							<Box className={classes.page} sx={{ width: fitPageWidth ? '100%' : '794px' }}>
								{/* Header */}
								<ReportPage pageName="Header" />
								{/* Content */}
								<ReportGeneratorPage showGuideLine={showGuideLine} />
								{/* Footer */}
								<ReportPage pageName="Footer" />
								{/* Image */}
								<ReportGeneratorImagePage showGuideLine={showGuideLine} />
							</Box>
						</Box>
					</Stack>
					{/* Footer & Header */}
					<ReportPropertyPanel />
				</Stack>
			</ThemeProvider>
		);
	},
);

ISVReportGenerator.displayName = 'ISVReportGenerator';
