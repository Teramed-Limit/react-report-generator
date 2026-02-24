import React from 'react';

import { Check } from '@mui/icons-material';
import { Box, Button, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import ReactPDF, { Styles } from '@react-pdf/renderer';

import useLocalStorage from '../../lib/hooks/useLocalStorage.ts';
import { ISVReportPDF } from '../../lib/ISVReportPDF/ISVReportPDF.tsx';
import { fontStore } from '../../lib/main.ts';
import { ReportImageData } from '../../lib/types/report-image-data.ts';
import { fonts } from '../assets/fonts.ts';
import { fakeImageListData } from '../constant/fakeData.ts';

interface Props {
	formData: Record<string, any>;
	formDefine: any;
	headerDefine: any;
	footerDefine: any;
	imageDefine: any[];
}

// 註冊字型
fonts.forEach((fontFamily) => {
	fontStore.register({
		family: fontFamily.family,
		fontStyle: fontFamily.fontStyle,
		fontWeight: fontFamily.fontWeight,
		fonts: fontFamily.fonts,
	});
});

function ReportPDF({ formData, formDefine, headerDefine, footerDefine, imageDefine }: Props) {
	// pdf style config
	const [pagePadding, setPagePadding] = useLocalStorage('pagePadding', 8);
	const [imagePerRow, setImagePerRow] = useLocalStorage('imagePerRow', 4);
	const [imagePageBreak, setImagePageBreak] = useLocalStorage('imagePageBreak', false);
	const [pdfBlob, setPdfBlob] = React.useState<Blob>(null);

	const downloadPDF = () => {
		const blob = new Blob([pdfBlob], { type: 'application/pdf' });
		const downloadUrl = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = downloadUrl;
		a.download = 'document.pdf';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(downloadUrl);
	};

	return (
		<Stack
			spacing={1}
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				position: 'relative',
			}}
		>
			<Stack spacing={1} direction="row" style={{ marginBottom: '6px' }}>
				<Stack direction="column">
					<Typography variant="caption" component="div">
						Image per row
					</Typography>
					<ToggleButtonGroup
						size="small"
						color="warning"
						value={imagePerRow}
						exclusive
						onChange={(event: React.MouseEvent<HTMLElement>, value: number) => setImagePerRow(value)}
					>
						<ToggleButton value={1}>1</ToggleButton>
						<ToggleButton value={2}>2</ToggleButton>
						<ToggleButton value={3}>3</ToggleButton>
						<ToggleButton value={4}>4</ToggleButton>
						<ToggleButton value={5}>5</ToggleButton>
						<ToggleButton value={6}>6</ToggleButton>
					</ToggleButtonGroup>
				</Stack>

				<Stack direction="column">
					<Typography variant="caption" component="div">
						Page break (Image)
					</Typography>
					<ToggleButton
						sx={{ width: '36px' }}
						size="small"
						color="warning"
						value="check"
						selected={imagePageBreak}
						onChange={() => setImagePageBreak((prev) => !prev)}
					>
						<Check />
					</ToggleButton>
				</Stack>

				<Stack direction="column" sx={{ width: '100px' }}>
					<Typography variant="caption" component="div">
						Page Padding
					</Typography>
					<TextField
						type="number"
						size="small"
						inputProps={{ min: 0 }}
						value={pagePadding}
						onChange={(event) => {
							setPagePadding(parseInt(event.target.value, 10));
						}}
					/>
				</Stack>
			</Stack>
			<ISVReportPDF<ReportImageData>
				showToolbar
				pagePadding={pagePadding}
				formData={formData}
				formDefine={formDefine}
				headerDefine={headerDefine}
				footerDefine={footerDefine}
				imageList={fakeImageListData}
				imagePerRow={imagePerRow}
				imagePageBreak={imagePageBreak}
				onPdfRenderCallback={setPdfBlob}
				getImageKey={(image) => image.sopInstanceUID}
				getImageSrc={(image) => image.imageSrc}
				renderImageDesc={(image) => (
					<ReactPDF.View
						key={image.sopInstanceUID}
						style={{
							width: '100%',
							maxWidth: '100%',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						{imageDefine.map((field) => (
							<ReactPDF.Text key={field.id} style={{ ...(field.valueStyle as Styles) }}>
								{field.id}
							</ReactPDF.Text>
						))}
					</ReactPDF.View>
				)}
				renderImageNumber={(image: ReportImageData) => (
					<ReactPDF.Text
						key={`${image.sopInstanceUID}`}
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
						{image.mappingNumber > 0 && `${image.mappingNumber}`}
					</ReactPDF.Text>
				)}
				contentContainerStyle={{ width: '100%', flexDirection: 'column' }}
				mainContentStyle={{ width: '100%', flexDirection: 'row' }}
				imgContainerStyle={{ width: '100%', flexDirection: 'column' }}
			/>
			<Stack direction="column" alignItems="end">
				<Box>
					<Button variant="contained" onClick={downloadPDF}>
						Download
					</Button>
				</Box>
			</Stack>
		</Stack>
	);
}

export default ReportPDF;
