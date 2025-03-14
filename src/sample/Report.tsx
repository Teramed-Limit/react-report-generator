import React, { useRef } from 'react';

import { Button, Stack } from '@mui/material';

import { ISVReport } from '../../lib/main.ts';
import CustomModal from '../../lib/modals/CustomModal/CustomModal.tsx';
import { Field } from '../../lib/types';
import { ISVReportHandle } from '../../lib/types/component-handle';
import { codeList } from '../constant/code-list.ts';
import { useFormDefine } from '../hooks/useFormDefine.ts';
import { useModalControl } from '../hooks/useModalControl.ts';
import ReportPDF from './ReportPDF.tsx';

function Report() {
	const { isModalOpen, openModal, closeModal } = useModalControl();
	const isvReportRef = useRef<ISVReportHandle>();

	// 使用自定義 Hook 來管理表單定義的狀態
	const { formData, setFormData, formDefine, imageDefine, headerDefine, footerDefine, loadFormDefine } =
		useFormDefine();

	// 儲存報告，拿到表單資料
	const saveReportData = () => {
		const formState = isvReportRef.current?.getFormState() || {};
		const isFormValidate = isvReportRef.current?.isFormValid();
		console.log('Form Data:', isvReportRef.current?.getFormData());
		console.log('Form State:', formState);
		console.log(isFormValidate);
		setFormData(isvReportRef.current?.getFormData() || {});
	};

	// 根據表單定義，產生 PDF
	const printPDF = () => {
		saveReportData();
		openModal();
	};

	return (
		<>
			<Stack
				direction="row"
				spacing={2}
				sx={{
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Button variant="contained" onClick={saveReportData}>
					Save
				</Button>
				<Button variant="contained" onClick={printPDF}>
					Print PDF
				</Button>
			</Stack>
			{formDefine && (
				<ISVReport
					ref={isvReportRef}
					formData={formData}
					formDefine={formDefine}
					formDisabled={false}
					defineChangeTriggerId="ReportTemplate"
					defineChangeTriggerCallBack={loadFormDefine}
					codeList={codeList as any}
					structReportParseApi="http://localhost:61818/api/structureReport/load"
					showFlowButton={false}
					buttonActionMap={{
						createTemplate: (field: Field) => {
							window.alert('Create Template');
						},
					}}
				/>
			)}
			<CustomModal width="90%" height="90%" label="" open={isModalOpen} onModalClose={closeModal}>
				<ReportPDF
					formData={formData}
					formDefine={formDefine}
					headerDefine={headerDefine}
					footerDefine={footerDefine}
					imageDefine={imageDefine}
				/>
			</CustomModal>
		</>
	);
}

export default Report;
