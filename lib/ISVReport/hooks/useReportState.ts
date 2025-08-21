import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import { codeListMapAtom } from '../../recoil/atoms/codeListAtom.ts';
import {
	buttonActionMapAtom,
	formDisabledAtom,
	formStatesAtom,
	formValuesAtom,
	getFieldValueAtom,
	structReportParseApiAtom,
} from '../../recoil/atoms/formDataAtoms.ts';
import { fieldCollectionAtom, formDefineAtom, srFieldsAtom } from '../../recoil/atoms/formDefineAtoms.ts';
import { SRUtility } from '../../service/sr-utility/sr-utility.ts';
import { ValidationService } from '../../service/validation/validation-service.ts';
import { Field, FieldMetaInfo, FormDefine, FormState, SRTreeNode } from '../../types';
import { isEmptyOrNil, isFieldMetaInfo, isFieldMetaMapInfo, updateNestedKey } from '../../utils/general.ts';

interface UseReportStateProps {
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

interface ReportState {
	isLoading: boolean;
	error: Error | null;
	isInitialized: boolean;
}

export const useReportState = ({
	formDefine,
	formData,
	formDisabled = false,
	srTreeNode,
	codeList,
	buttonActionMap,
	structReportParseApi,
	defineChangeTriggerId,
	defineChangeTriggerCallBack,
}: UseReportStateProps) => {
	// Local state
	const [reportState, setReportState] = useState<ReportState>({
		isLoading: true,
		error: null,
		isInitialized: false,
	});

	// Recoil state setters
	const setFormData = useSetRecoilState(formValuesAtom);
	const setFormState = useSetRecoilState(formStatesAtom);
	const setFormDefine = useSetRecoilState(formDefineAtom);
	const setFormDisabled = useSetRecoilState(formDisabledAtom);
	const setCodeListMap = useSetRecoilState(codeListMapAtom);
	const setButtonActionMap = useSetRecoilState(buttonActionMapAtom);
	const setStructReportParseApi = useSetRecoilState(structReportParseApiAtom);

	// Recoil state values
	const fieldCollection = useRecoilValue(fieldCollectionAtom);
	const srFields = useRecoilValue(srFieldsAtom);
	const reportTemplate = useRecoilValue(getFieldValueAtom(defineChangeTriggerId)) as string;

	// Refs for tracking changes
	const prevReportTemplate = useRef<string>();
	const memoizedFields = useRef<string>();

	// Memoized validation service
	const validationService = useMemo(() => new ValidationService(), []);

	// 取得完整 formdata
	const getFormData = useRecoilCallback(
		({ snapshot }) =>
			() => {
				return snapshot.getLoadable(formValuesAtom).contents;
			},
		[],
	);

	// 取得完整 formstate，並把所有 field 設為 dirty
	const getFormState = useRecoilCallback(
		({ snapshot }) =>
			() => {
				const formState = snapshot.getLoadable(formStatesAtom).contents;
				const returnFormState = updateNestedKey(formState, 'isDirty', true);
				setFormState(returnFormState);
				return returnFormState;
			},
		[],
	);

	// Initialize report state
	const initializeReport = useCallback(async () => {
		try {
			setReportState((prev) => ({ ...prev, isLoading: true, error: null }));

			// Batch state updates
			setFormData(formData);
			setFormDefine(formDefine);
			setFormDisabled(formDisabled);
			setCodeListMap(codeList);
			setButtonActionMap(buttonActionMap);
			setStructReportParseApi(structReportParseApi);

			setReportState({
				isLoading: false,
				error: null,
				isInitialized: true,
			});
		} catch (error) {
			setReportState({
				isLoading: false,
				error: error as Error,
				isInitialized: false,
			});
		}
	}, [
		formData,
		formDefine,
		formDisabled,
		codeList,
		buttonActionMap,
		structReportParseApi,
		setFormData,
		setFormDefine,
		setFormDisabled,
		setCodeListMap,
		setButtonActionMap,
		setStructReportParseApi,
	]);

	// Initialize on mount and when dependencies change
	useEffect(() => {
		initializeReport();
	}, [initializeReport]);

	// Handle template changes
	useEffect(() => {
		if (prevReportTemplate.current === reportTemplate) return;
		defineChangeTriggerCallBack(reportTemplate);
		prevReportTemplate.current = reportTemplate;
	}, [defineChangeTriggerCallBack, reportTemplate]);

	// Handle form validation when fields change
	useEffect(() => {
		if (memoizedFields.current === JSON.stringify(fieldCollection)) return;

		const formState: FormState = {};
		const internalFormData = getFormData() || {};

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
				const arrayState: any[] = [];
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
	}, [fieldCollection, getFormData, setFormState, validationService]);

	// Handle SR Text initialization
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

	return {
		reportState,
		fieldCollection,
		initializeReport,
		getFormData,
		getFormState,
	};
};
