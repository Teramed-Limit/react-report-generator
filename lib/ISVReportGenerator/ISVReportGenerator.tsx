import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

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
import { Field, FontFamily, FormDefine, RepPage } from '../types';
import { ISVReportGeneratorHandle } from '../types/component-handle';
import { deepCopy } from '../utils/general.ts';

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
	fonts: FontFamily[];
}

export const ISVReportGenerator = forwardRef<ISVReportGeneratorHandle, Props>(
	({ formData, formDefine, imageDefine, headerDefine, footerDefine, codeList, fonts }: Props, ref) => {
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

		function updateValueStyleId<T>(obj: T, styleName: string, styleValue: string, target: string): T {
			if (Array.isArray(obj)) {
				// 使用 map 來返回新的陣列
				return obj.map((item) => updateValueStyleId(item, styleName, styleValue, target)) as unknown as T;
			}
			if (typeof obj === 'object' && obj !== null) {
				// 創建新物件以避免直接修改函數參數
				const newObj = { ...obj };

				// 檢查是否具有 target 屬性
				if (newObj?.[target]) {
					newObj[target] = {
						...newObj[target],
						[styleName]: styleValue,
					};
				}

				// 使用 Object.entries() 和 reduce 來遍歷並返回新的物件
				return Object.entries(newObj).reduce((acc, [key, value]) => {
					acc[key] = updateValueStyleId(value, styleName, styleValue, target);
					return acc;
				}, {} as T);
			}

			return obj;
		}

		const setGlobalFontStyle = (styleName: string, styleValue: any, target: string) => {
			setFormDefine((prev) => {
				return updateValueStyleId<FormDefine>(deepCopy(prev), styleName, styleValue, target);
			});
			setImageDefine((prev) => {
				return updateValueStyleId<Field[]>(deepCopy(prev), styleName, styleValue, target);
			});
		};

		const setContainerSpacingZero = (styleName: string, styleValue: any, target: string) => {
			setFormDefine((prev) => {
				return updateValueStyleId<FormDefine>(deepCopy(prev), styleName, styleValue, target);
			});
			setImageDefine((prev) => {
				return updateValueStyleId<Field[]>(deepCopy(prev), styleName, styleValue, target);
			});
		};

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
												setContainerSpacingZero(`${property}${side}`, 0, style);
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
									setGlobalFontStyle(styleName, styleValue, 'labelStyle')
								}
							/>
							<UniversalFontStyle
								title="Universal Value Style"
								setStyle={(styleName: string, styleValue: any) =>
									setGlobalFontStyle(styleName, styleValue, 'valueStyle')
								}
							/>
						</Stack>
						{/* Report */}
						<Box className={classes.reportLayout}>
							<Box className={classes.page} sx={{ width: fitPageWidth ? '100%' : '794px' }}>
								{/* Header */}
								<ReportPage page={headerDefine} />
								{/* Content */}
								<ReportGeneratorPage showGuideLine={showGuideLine} />
								{/* Footer */}
								<ReportPage page={footerDefine} />
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
