import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, IconButton, Stack, ThemeProvider } from '@mui/material';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import useLocalStorage from '../hooks/useLocalStorage.ts';
import { codeListMapAtom } from '../recoil/atoms/codeListAtom.ts';
import {
	buttonActionMapAtom,
	formDisabledAtom,
	formStatesAtom,
	formValuesAtom,
	getFieldValueAtom,
	structReportParseApiAtom,
} from '../recoil/atoms/formDataAtoms.ts';
import { fieldCollectionAtom, formDefineAtom, srFieldsAtom } from '../recoil/atoms/formDefineAtoms.ts';
import { SRUtility } from '../service/sr-utility/sr-utility.ts';
import { ValidationService } from '../service/validation/validation-service.ts';

import '@mui/material/styles/styled';

import { rootTheme } from '../theme/rootTheme.ts';
import {
	Field,
	FieldMetaInfo,
	FormControl,
	FormControlArray,
	FormDefine,
	FormState,
	Section,
	SRTreeNode,
} from '../types';
import { ISVReportHandle } from '../types/component-handle';
import {
	isEmptyOrNil,
	isFieldMetaInfo,
	isFieldMetaMapInfo,
	isFormControl,
	isFormControlArray,
	updateNestedKey,
} from '../utils/general.ts';
import ReportSection from './components/ReportSection/ReportSection.tsx';
import classes from './ISVReport.module.scss';
import { reportPage } from './style.ts';
import '../styles/scrollbar.scss';

interface Props {
	formDefine: FormDefine;
	formData: Record<string, any>;
	formDisabled?: boolean;
	srTreeNode?: SRTreeNode;
	codeList: Record<string, any[]>;
	buttonActionMap?: Record<string, (field: Field) => void>;
	structReportParseApi?: string;
	defineChangeTriggerId: string;
	defineChangeTriggerCallBack: (template: string) => void;
}

export const ISVReport = forwardRef<ISVReportHandle, Props>(
	(
		{
			formDefine,
			formData,
			formDisabled = false,
			srTreeNode,
			codeList,
			buttonActionMap,
			structReportParseApi,
			defineChangeTriggerId,
			defineChangeTriggerCallBack,
		}: Props,
		ref,
	) => {
		const [internalFormData, setFormData] = useRecoilState(formValuesAtom);
		const setFormState = useSetRecoilState(formStatesAtom);
		const setFormDefine = useSetRecoilState(formDefineAtom);
		const setFormDisabled = useSetRecoilState(formDisabledAtom);
		const setCodeListMap = useSetRecoilState(codeListMapAtom);
		const setButtonActionMap = useSetRecoilState(buttonActionMapAtom);
		const setStructReportParseApi = useSetRecoilState(structReportParseApiAtom);
		const fieldCollection = useRecoilValue(fieldCollectionAtom);
		const srFields = useRecoilValue(srFieldsAtom);
		const reportTemplate = useRecoilValue(getFieldValueAtom(defineChangeTriggerId)) as string;
		const prevReportTemplate = useRef<string>();

		// 用來確保所有的 useEffect 都已經完成
		const [isFormDataSet, setIsFormDataSet] = useState(false);
		const [isFormDefineSet, setIsFormDefineSet] = useState(false);
		const [isFormConfigSet, setIsFormConfigSet] = useState(false);

		// 縮放比例
		const [scale, setScale] = useLocalStorage<number>('reportScale', 1);

		// 當報告模板有變動通知上層
		useEffect(() => {
			if (prevReportTemplate.current === reportTemplate) return;
			defineChangeTriggerCallBack(reportTemplate);
			prevReportTemplate.current = reportTemplate;
		}, [defineChangeTriggerCallBack, reportTemplate]);

		// 報告如果有變動，重新計算 formState
		const memoizedFields = useRef<string>();
		useEffect(() => {
			if (memoizedFields.current === JSON.stringify(fieldCollection)) return;

			const formState: FormState = {};
			const validationService = new ValidationService();

			Object.keys(fieldCollection).forEach((key) => {
				const initState = {
					isDirty: false,
					isValid: true,
					errorMessage: '',
				};

				if (isFieldMetaInfo(fieldCollection[key])) {
					const { field } = fieldCollection[key] as FieldMetaInfo;
					formState[field.id] = {
						...initState,
						...validationService.validate(internalFormData[field.id], field.validate, internalFormData),
					};
				}

				if (isFieldMetaMapInfo(fieldCollection[key])) {
					const arrayValue = internalFormData[key];
					if (!arrayValue) return;
					const arrayField = fieldCollection[key] as Record<string, FieldMetaInfo>;
					const arrayState: FormControlArray = [];
					Object.keys(arrayValue).forEach((arrayKey) => {
						const item = arrayValue[arrayKey];
						const itemState = {};
						Object.keys(arrayField).forEach((fieldKey) => {
							const { field } = arrayField[fieldKey];
							itemState[field.id] = {
								...initState,
								...validationService.validate(item[field.id], field.validate, internalFormData),
							};
						});
						arrayState.push(itemState);
					});
					formState[key] = arrayState;
				}
			});

			setFormState(formState);
			memoizedFields.current = JSON.stringify(fieldCollection);
		}, [fieldCollection, internalFormData, setFormState]);

		useEffect(() => {
			setFormData(formData);
			setIsFormDataSet(true);
		}, [formData, setFormData]);

		// 處理SRText的預設值
		useEffect(() => {
			if (srTreeNode && !isEmptyOrNil(srFields)) return;
			const reportSRData = {};
			Object.keys(srFields).forEach((key) => {
				const field = srFields[key];
				if (isEmptyOrNil(field?.structureReportPath)) return;
				reportSRData[field.id] = SRUtility.parseSR(srTreeNode, field.structureReportPath);
			});
			setFormData((prev) => ({ ...prev, ...reportSRData }));
		}, [setFormData, srFields, srTreeNode]);

		useEffect(() => {
			setFormDefine(formDefine);
			setIsFormDefineSet(true);
		}, [formDefine, setFormDefine]);

		useEffect(() => {
			setFormDisabled(formDisabled || false);
			setButtonActionMap(buttonActionMap);
			setCodeListMap(codeList);
			setStructReportParseApi(structReportParseApi);
			setIsFormConfigSet(true);
		}, [
			buttonActionMap,
			codeList,
			formDisabled,
			structReportParseApi,
			setButtonActionMap,
			setCodeListMap,
			setFormDisabled,
			setStructReportParseApi,
		]);

		const getAllFormState = () => {
			let newState: FormState = {};
			setFormState((prev) => {
				newState = updateNestedKey(prev, 'isDirty', true);
				return newState;
			});
			return newState;
		};

		useImperativeHandle(ref, () => ({
			getFormData: () => internalFormData,
			getFormState: () => getAllFormState(),
			isFormValid: () => {
				const formState = getAllFormState();
				return !Object.keys(formState).some((key) => {
					if (isFormControl(formState[key])) {
						const fieldState = formState[key] as FormControl;
						return !fieldState.isValid;
					}
					if (isFormControlArray(formState[key])) {
						const arrayState = formState[key] as FormControlArray;
						return arrayState.some((item) => Object.values(item).some((field) => !field.isValid));
					}
					return false;
				});
			},
		}));

		const allEffectsCompleted = isFormDataSet && isFormDefineSet && isFormConfigSet;

		if (!allEffectsCompleted) {
			return null; // 或者可以顯示一個 loading 狀態
		}

		return (
			<ThemeProvider theme={rootTheme}>
				<Stack direction="row" className={classes.pageContainer}>
					<Box className={classes.reportLayout} sx={reportPage}>
						<Box className={classes.page} sx={{ transform: `scale(${scale})` }}>
							{formDefine?.sections
								.filter((section: Section) => !section.hide)
								.map((section: Section) => <ReportSection key={section.id} section={section} />)}
						</Box>
					</Box>
					<Stack className={classes.flowButtonContainer}>
						<IconButton size="large" color="primary" onClick={() => setScale((prev) => prev + 0.2)}>
							<AddCircleIcon fontSize="large" />
						</IconButton>
						<IconButton size="large" color="primary" onClick={() => setScale((prev) => prev - 0.2)}>
							<RemoveCircleIcon fontSize="large" />
						</IconButton>
					</Stack>
				</Stack>
			</ThemeProvider>
		);
	},
);

ISVReport.displayName = 'ISVReport';
