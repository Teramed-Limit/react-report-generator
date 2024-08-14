import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, IconButton, Stack, ThemeProvider } from '@mui/material';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import useLocalStorage from '../hooks/useLocalStorage.ts';
import {
	buttonActionMapAtom,
	codeListMapAtom,
	formDisabledAtom,
	formStatesAtom,
	formValuesAtom,
} from '../recoil/atoms/formAtoms.ts';
import '@mui/material/styles/styled';
import { rootTheme } from '../theme/rootTheme.ts';
import { FormDefine, Section } from '../types/define.ts';
import { Field } from '../types/field/field.ts';
import { FormState } from '../types/form-state.ts';
import ReportSection from './components/ReportSection/ReportSection.tsx';
import { reportPage } from './style.ts';
import classes from './styles.module.scss';

import '../styles/scrollbar.scss';

interface Props {
	formDefine: FormDefine;
	formData: Record<string, any>;
	formDisabled?: boolean;
	codeList: Record<string, any[]>;
	buttonActionMap?: Record<string, (field: Field) => void>;
}

export type ISVReportHandle = {
	getFormData(): Record<string, any[]>;
	getFormState(): FormState;
};

const ISVReport = forwardRef<ISVReportHandle, Props>(
	({ formDefine, formData, formDisabled = false, codeList, buttonActionMap }: Props, ref) => {
		const [internalFormData, setFormData] = useRecoilState(formValuesAtom);
		const internalFormState = useRecoilValue(formStatesAtom);
		const setFormDisabled = useSetRecoilState(formDisabledAtom);
		const setCodeListMap = useSetRecoilState(codeListMapAtom);
		const setButtonActionMap = useSetRecoilState(buttonActionMapAtom);

		const [isFormDataSet, setIsFormDataSet] = useState(false);
		const [isFormDisabledSet, setIsFormDisabledSet] = useState(false);
		const [isCodeListSet, setIsCodeListSet] = useState(false);
		const [isButtonActionMapSet, setIsButtonActionMapSet] = useState(false);

		const [scale, setScale] = useLocalStorage<number>('reportScale', 1);

		useEffect(() => {
			setFormData(formData);
			setIsFormDataSet(true);
		}, [formData, setFormData]);

		useEffect(() => {
			setFormDisabled(formDisabled || false);
			setIsFormDisabledSet(true);
		}, [formDisabled, setFormDisabled]);

		useEffect(() => {
			setCodeListMap(codeList);
			setIsCodeListSet(true);
		}, [codeList, setCodeListMap]);

		useEffect(() => {
			setButtonActionMap(buttonActionMap);
			setIsButtonActionMapSet(true);
		}, [buttonActionMap, setButtonActionMap]);

		useImperativeHandle(ref, () => ({
			getFormData: () => internalFormData,
			getFormState: () => internalFormState,
		}));

		const allEffectsCompleted = isFormDataSet && isFormDisabledSet && isCodeListSet && isButtonActionMapSet;

		if (!allEffectsCompleted) {
			return null; // 或者可以顯示一個 loading 狀態
		}

		return (
			<ThemeProvider theme={rootTheme}>
				<Stack direction="row" className={classes.pageContainer}>
					<Box className={classes.reportLayout} sx={reportPage}>
						<Box className={classes.page} sx={{ transform: `scale(${scale})` }}>
							{formDefine.sections
								.filter((section: Section) => !section.hide)
								.map((section: Section) => (
									<ReportSection key={section.id} section={section} />
								))}
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

export default ISVReport;
