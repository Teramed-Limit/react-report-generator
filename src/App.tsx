import './App.css';
import React, { useRef } from 'react';

import { Button, Stack, Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import ReactPDF, { Styles } from '@react-pdf/renderer';

import { registerFont } from '../lib/assets/fonts.ts';
import withRecoilRoot from '../lib/hoc/withRecoilRoot.tsx';
import { useModal } from '../lib/hooks/useModal.ts';
import ISVReport, { ISVReportHandle } from '../lib/ISVReport/index.tsx';
import ISVReportGenerator, { ISVReportGeneratorHandle } from '../lib/ISVReportGenerator/ISVReportGenerator.tsx';
import ISVReportPDF from '../lib/ISVReportPDF/ISVReportPDF.tsx';
import CustomModal from '../lib/modals/CustomModal/CustomModal.tsx';
import { FormDefine } from '../lib/types/define.ts';
import { Field } from '../lib/types/field/field.ts';
import { RepPage } from '../lib/types/report-generator/rep-page.ts';
import { ReportImageData } from '../lib/types/report-image-data.ts';
import { codeList } from './constant/code-list.ts';
import { gridTableDefine } from './constant/cystoscopy-define.ts';
import { fakeData, fakeImageListData } from './constant/fakeData.ts';
import { defaultFooterDefine } from './constant/footer-define.ts';
import { defaultHeaderDefine } from './constant/header-define.ts';
import { imageFieldsDefine } from './constant/image-define.ts';
import TabPanel from './TabPanel/TabPanel.tsx';

registerFont();

function App() {
	const { open, setOpen, onModalClose } = useModal({});
	const isvReportRef = useRef<ISVReportHandle>();
	const isvReportGeneratorHandleRef = useRef<ISVReportGeneratorHandle>();

	const [value, setValue] = React.useState(0);

	const [formData, setFormData] = React.useState<Record<string, any>>(fakeData);
	// const [formDefine, setFormDefine] = React.useState<FormDefine>(cystoscopyDefine);
	const [formDefine, setFormDefine] = React.useState<FormDefine>(gridTableDefine);
	const [imageDefine, setImageDefine] = React.useState<Field[]>(imageFieldsDefine);
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
		<Stack sx={{ height: '100vh', p: 2 }}>
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
					<Tabs value={value} onChange={handleChange}>
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
					buttonActionMap={{
						createTemplate: (field: Field) => {
							window.alert('Create Template');
						},
					}}
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
				<ISVReportPDF<ReportImageData>
					showToolbar
					formData={formData}
					formDefine={formDefine}
					headerDefine={headerDefine}
					footerDefine={footerDefine}
					imageList={fakeImageListData}
					getImageKey={(image) => image.SOPInstanceUID}
					getImageSrc={(image) => image.ImageSrc}
					compareFunction={(a, b) => (a.MappingNumber > b.MappingNumber ? 1 : -1)}
					renderImageDesc={(image) => (
						<ReactPDF.View
							style={{
								width: '100%',
								maxWidth: '100%',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							{imageDefine.map((field) => {
								return (
									<ReactPDF.Text key={field.id} style={{ ...(field.valueStyle as Styles) }}>
										{field.id}
									</ReactPDF.Text>
								);
							})}
						</ReactPDF.View>
					)}
					renderImageNumber={(image) => (
						<ReactPDF.Text
							style={{
								fontWeight: 'bold',
								fontSize: '18px',
								position: 'absolute',
								color: 'white',
								padding: '4px',
								left: 0,
								top: 0,
							}}
						>
							{image.MappingNumber > 0 && `${image.MappingNumber}`}
						</ReactPDF.Text>
					)}
				/>
			</CustomModal>
		</Stack>
	);
}

export default withRecoilRoot(App);
