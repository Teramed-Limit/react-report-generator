import './App.css';
import React, { useRef } from 'react';

import { Button, Stack, Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';

import withRecoilRoot from '../lib/hoc/withRecoilRoot.tsx';
import { useModal } from '../lib/hooks/useModal.ts';
import ISVReport, { ISVReportHandle } from '../lib/ISVReport/index.tsx';
import ISVReportGenerator, { ISVReportGeneratorHandle } from '../lib/ISVReportGenerator/ISVReportGenerator.tsx';
import ISVReportPDF from '../lib/ISVReportPDF/ISVReportPDF.tsx';
import CustomModal from '../lib/modals/CustomModal/CustomModal.tsx';
import { FormDefine } from '../lib/types/define.ts';
import { RepPage } from '../lib/types/report-generator/rep-page.ts';
import { codeList } from './constant/code-list.ts';
import { cystoscopyDefine } from './constant/cystoscopy-define.ts';
import { fakeData } from './constant/fakeData.ts';
import { defaultFooterDefine } from './constant/footer-define.ts';
import { defaultHeaderDefine } from './constant/header-define.ts';
import TabPanel from './TabPanel/TabPanel.tsx';

function App() {
	const { open, setOpen, onModalClose } = useModal({});
	const isvReportRef = useRef<ISVReportHandle>();
	const isvReportGeneratorHandleRef = useRef<ISVReportGeneratorHandle>();

	const [value, setValue] = React.useState(0);

	const [formData, setFormData] = React.useState<Record<string, any>>(fakeData);
	const [formDefine, setFormDefine] = React.useState<FormDefine>(cystoscopyDefine);
	const [imageDefine, setImageDefine] = React.useState<FormDefine>({ sections: [] });
	const [headerDefine, setHeaderDefine] = React.useState<RepPage>(defaultHeaderDefine);
	const [footerDefine, setFooterDefine] = React.useState<RepPage>(defaultFooterDefine);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const handleButtonClick = () => {
		if (isvReportRef.current) {
			console.log(isvReportRef.current.getFormData());
			setFormData(isvReportRef.current.getFormData());
		}
		if (isvReportGeneratorHandleRef.current) {
			console.log(isvReportGeneratorHandleRef.current.getFormDefine());
			setFormDefine(isvReportGeneratorHandleRef.current.getFormDefine());
			setImageDefine(isvReportGeneratorHandleRef.current.getImageDefine());
			setHeaderDefine(isvReportGeneratorHandleRef.current.getHeaderDefine());
			setFooterDefine(isvReportGeneratorHandleRef.current.getFooterDefine());
		}
	};

	return (
		<Stack sx={{ maxHeight: '100vh', p: 2 }}>
			<Stack
				direction="row"
				spacing={2}
				sx={{
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Button variant="contained" onClick={handleButtonClick}>
					Save
				</Button>
				<Button variant="contained" onClick={() => setOpen(true)}>
					Print PDF
				</Button>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
						<Tab label="Report" value={0} />
						<Tab label="Rep. Generator" value={1} />
					</Tabs>
				</Box>
			</Stack>
			<TabPanel value={value} index={0}>
				<ISVReport
					ref={isvReportRef}
					formData={formData}
					formDefine={formDefine}
					formDisabled={false}
					codeList={codeList as any}
				/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<ISVReportGenerator
					ref={isvReportGeneratorHandleRef}
					formData={formData}
					formDefine={formDefine}
					imageDefine={imageDefine}
					headerDefine={headerDefine}
					footerDefine={footerDefine}
					codeList={codeList as any}
				/>
			</TabPanel>
			<CustomModal width="90%" height="90%" label="" open={open} onModalClose={() => onModalClose()}>
				<ISVReportPDF
					formData={formData}
					formDefine={formDefine}
					// imageDefine={imageDefine}
					headerDefine={headerDefine}
					footerDefine={footerDefine}
				/>
			</CustomModal>
		</Stack>
	);
}

export default withRecoilRoot(App);
