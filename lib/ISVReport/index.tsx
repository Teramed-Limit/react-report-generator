import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { Box, Stack, ThemeProvider } from '@mui/material';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import withRecoilRoot from '../hoc/withRecoilRoot.tsx';
import { codeListMapAtom, formDisabledAtom, formStatesAtom, formValuesAtom } from '../recoil/atoms/formAtoms.ts';
import '@mui/material/styles/styled';
import { rootTheme } from '../theme/rootTheme.ts';
import { FormDefine, Section } from '../types/define.ts';
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
}

export type ISVReportHandle = {
	getFormData(): Record<string, any[]>;
	getFormState(): FormState;
};

const ISVReport = forwardRef<ISVReportHandle, Props>(
	({ formDefine, formData, formDisabled = false, codeList }: Props, ref) => {
		const [internalFormData, setFormData] = useRecoilState(formValuesAtom);
		const internalFormState = useRecoilValue(formStatesAtom);
		const setFormDisabled = useSetRecoilState(formDisabledAtom);
		const setCodeListMap = useSetRecoilState(codeListMapAtom);

		const [isFormDataSet, setIsFormDataSet] = useState(false);
		const [isFormDisabledSet, setIsFormDisabledSet] = useState(false);
		const [isCodeListSet, setIsCodeListSet] = useState(false);

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

		useImperativeHandle(ref, () => ({
			getFormData: () => internalFormData,
			getFormState: () => internalFormState,
		}));

		const allEffectsCompleted = isFormDataSet && isFormDisabledSet && isCodeListSet;

		if (!allEffectsCompleted) {
			return null; // 或者可以顯示一個 loading 狀態
		}

		return (
			<ThemeProvider theme={rootTheme}>
				<Stack direction="row" sx={{ position: 'relative' }}>
					<Box className={classes.reportLayout} sx={reportPage}>
						<Box className={classes.page}>
							{formDefine.sections
								.filter((section: Section) => !section.hide)
								.map((section: Section) => (
									<ReportSection key={section.id} section={section} />
								))}
						</Box>
					</Box>
				</Stack>
			</ThemeProvider>
		);
	},
);

ISVReport.displayName = 'ISVReport';

export default withRecoilRoot(ISVReport);
