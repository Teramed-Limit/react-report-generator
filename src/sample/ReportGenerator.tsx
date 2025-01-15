import React, { useEffect, useRef } from 'react';

import { Box, Button, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import { ISVReportGenerator } from '../../lib/main.ts';
import CustomModal from '../../lib/modals/CustomModal/CustomModal.tsx';
import { ISVReportGeneratorHandle } from '../../lib/types/component-handle';
import { fonts } from '../assets/fonts.ts';
import { codeList } from '../constant/code-list.ts';
import { useFormDefine } from '../hooks/useFormDefine.ts';
import { useModalControl } from '../hooks/useModalControl.ts';
import ReportPDF from './ReportPDF.tsx';

function ReportGenerator() {
	const { isModalOpen, openModal, closeModal } = useModalControl();
	const isvReportGeneratorHandleRef = useRef<ISVReportGeneratorHandle>();

	const {
		formData,
		setFormData,
		formDefineMap,
		formDefine,
		setFormDefine,
		imageDefine,
		setImageDefine,
		headerDefine,
		setHeaderDefine,
		footerDefine,
		setFooterDefine,
		loadFormDefine,
	} = useFormDefine();

	useEffect(() => {
		loadFormDefine('Blank');
	}, [loadFormDefine]);

	const saveReportDefine = () => {
		setFormData(isvReportGeneratorHandleRef.current?.getFormData() || {});
		setHeaderDefine(isvReportGeneratorHandleRef.current?.getHeaderDefine());
		setFooterDefine(isvReportGeneratorHandleRef.current?.getFooterDefine());
		setFormDefine(isvReportGeneratorHandleRef.current?.getFormDefine());
		setImageDefine(isvReportGeneratorHandleRef.current?.getImageDefine());
		console.log(isvReportGeneratorHandleRef.current?.getFormDefine());
	};

	// 根據表單定義，產生 PDF
	const printPDF = () => {
		saveReportDefine();
		openModal();
	};

	const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		loadFormDefine(e.target.value);
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
				<Box>
					<Typography>Select Report Template</Typography>
					<select style={{ border: '1px solid black' }} onChange={selectChange}>
						{Object.keys(formDefineMap).map((key) => {
							return <option key={key}>{key}</option>;
						})}
					</select>
				</Box>
				<Button variant="contained" onClick={saveReportDefine}>
					Save
				</Button>
				<Button variant="contained" onClick={printPDF}>
					Print PDF
				</Button>
			</Stack>
			<ISVReportGenerator
				ref={isvReportGeneratorHandleRef}
				formData={formData}
				formDefine={formDefine}
				fonts={fonts}
				imageDefine={imageDefine}
				headerDefine={headerDefine}
				footerDefine={footerDefine}
				codeList={codeList as any}
			/>
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

export default ReportGenerator;
