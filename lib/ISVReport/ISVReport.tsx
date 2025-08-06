import { forwardRef, useImperativeHandle } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, IconButton, Stack, ThemeProvider } from '@mui/material';
import { useRecoilState, useSetRecoilState } from 'recoil';

import useLocalStorage from '../hooks/useLocalStorage.ts';
import { formStatesAtom } from '../recoil/atoms/formDataAtoms.ts';
import '../styles/scrollbar.scss';
import { rootTheme } from '../theme/rootTheme.ts';
import { FormControl, FormControlArray, Section } from '../types';
import { ISVReportHandle } from '../types/component-handle';
import { isFormControl, isFormControlArray, updateNestedKey } from '../utils/general.ts';

import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';
import { LoadingOverlay } from './components/LoadingOverlay/LoadingOverlay.tsx';
import ReportSection from './components/ReportSection/ReportSection.tsx';
import { useReportState } from './hooks/useReportState.ts';
import classes from './ISVReport.module.scss';
import { reportPage } from './style.ts';
import { ISVReportProps } from './types/index.ts';

export const ISVReport = forwardRef<ISVReportHandle, ISVReportProps>((props, ref) => {
	const {
		formDefine,
		formData,
		formDisabled = false,
		srTreeNode,
		codeList,
		buttonActionMap,
		structReportParseApi,
		defineChangeTriggerId,
		defineChangeTriggerCallBack,
		pageStyle,
		showFlowButton = true,
	} = props;

	// Use our custom hook for state management
	const { reportState, internalFormData } = useReportState({
		formDefine,
		formData,
		formDisabled,
		srTreeNode,
		codeList,
		buttonActionMap,
		structReportParseApi,
		defineChangeTriggerId,
		defineChangeTriggerCallBack,
	});

	// Form state management for imperative handle
	const setFormState = useSetRecoilState(formStatesAtom);

	// Scale for zoom functionality
	const [scale, setScale] = useLocalStorage<number>('reportScale', 1);

	const getAllFormState = () => {
		let newState: any = {};
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

	// Handle error from reportState
	const handleError = (error: Error) => {
		console.error('ISVReport Error:', error);
	};

	return (
		<ErrorBoundary onError={handleError}>
			<ThemeProvider theme={rootTheme}>
				<Box sx={{ position: 'relative', height: '100%' }}>
					<LoadingOverlay isLoading={reportState.isLoading} message="初始化報告中..." />

					{reportState.error && (
						<Box sx={{ p: 3 }}>
							<div>錯誤: {reportState.error.message}</div>
						</Box>
					)}

					{reportState.isInitialized && !reportState.error && (
						<Stack
							id="pageContainer"
							style={pageStyle?.pageContainer}
							direction="row"
							className={classes.pageContainer}
						>
							<Box id="reportLayout" className={classes.reportLayout} sx={reportPage}>
								<Box
									id="page"
									style={pageStyle?.page}
									className={classes.page}
									sx={{ transform: `scale(${scale})` }}
								>
									{formDefine?.sections
										.filter((section: Section) => !section.hide)
										.map((section: Section) => (
											<ReportSection key={section.id} section={section} />
										))}
								</Box>
							</Box>
							{showFlowButton && (
								<Stack id="flowScaleButton" className={classes.flowButtonContainer}>
									<IconButton
										size="large"
										color="primary"
										onClick={() => setScale((prev) => prev + 0.2)}
									>
										<AddCircleIcon fontSize="large" />
									</IconButton>
									<IconButton
										size="large"
										color="primary"
										onClick={() => setScale((prev) => prev - 0.2)}
									>
										<RemoveCircleIcon fontSize="large" />
									</IconButton>
								</Stack>
							)}
						</Stack>
					)}
				</Box>
			</ThemeProvider>
		</ErrorBoundary>
	);
});

ISVReport.displayName = 'ISVReport';
