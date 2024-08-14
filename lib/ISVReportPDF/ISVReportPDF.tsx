import React, { useCallback, useRef, useState } from 'react';

import { Check } from '@mui/icons-material';
import { Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReactPDF, { Document, PDFViewer } from '@react-pdf/renderer';
import { useRecoilValue } from 'recoil';
import { Subject } from 'rxjs';

import useLocalStorage from '../hooks/useLocalStorage.ts';
import { codeListMapAtom } from '../recoil/atoms/formAtoms.ts';
import { FormDefine, Section } from '../types/define.ts';
import { RepPage } from '../types/report-generator/rep-page.ts';
import Block from '../UI/Block/Block.tsx';
import Spinner from '../UI/Spinner/Spinner.tsx';
import PDFImageList from './components/PDFImageList/PDFImageList.tsx';
import PDFReportContent from './components/PDFReportContent/PDFReportContent.tsx';
import PDFReportFooter from './components/PDFReportFooter/PDFReportFooter.tsx';
import PDFReportHeader from './components/PDFReportHeader/PDFReportHeader.tsx';
import classes from './ISVReportPDF.module.scss';
import { styles } from './styles/style.ts';

interface Props<TImage> {
	showToolbar?: boolean;
	formDefine: FormDefine;
	formData: Record<string, any>;
	headerDefine: RepPage;
	footerDefine: RepPage;
	onPdfRenderCallback?: (base64: string) => void;
	imageList?: any[];
	getImageKey?: (image: TImage) => string;
	getImageSrc?: (image: TImage) => string;
	compareFunction?: (a: TImage, b: TImage) => number;
	renderImageDesc?: (image: TImage) => React.ReactNode;
	renderImageNumber?: (image: TImage) => React.ReactNode;
}

export const padding = 0.2;

function ISVReportPDF<TImage>({
	showToolbar = false,
	formData,
	formDefine,
	headerDefine,
	footerDefine,
	onPdfRenderCallback,
	imageList,
	getImageKey,
	getImageSrc,
	compareFunction,
	renderImageDesc,
	renderImageNumber,
}: Props<TImage>) {
	const codeListMap = useRecoilValue(codeListMapAtom);

	// 創建一個 Subject，監控 PDF 渲染狀態
	const onPdfRenderSubject = useRef(new Subject<Blob>());
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	// pdf style config
	const [row, setRow] = useLocalStorage('imagePerRow', 4);
	const [pageBreak, setPageBreak] = useLocalStorage('imagePageBreak', false);
	const [pagePadding, setPagePadding] = useLocalStorage('pagePadding', 8);

	const pdfStyle: {
		imagePerRow: number;
		imagePageBreak: boolean;
		pagePadding: number;
	} = {
		imagePerRow: row || 4,
		imagePageBreak: pageBreak || false,
		pagePadding: pagePadding || 8,
	};

	// 確保就算onPdfRender，render好幾次，也只會執行一次callback
	const onPdfRender = useCallback(
		(renderProps: ReactPDF.OnRenderProps) => {
			if (!renderProps?.blob) return;
			// onPdfRenderSubject.current.next(renderProps.blob);
			const reader = new FileReader();
			reader.readAsDataURL(renderProps?.blob);
			reader.onloadend = () => {
				const pdfBase64 = reader.result as string;
				onPdfRenderCallback?.(pdfBase64);
				setLoading(false);
			};
		},
		[onPdfRenderCallback],
	);

	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
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
						value={row}
						exclusive
						onChange={(event: React.MouseEvent<HTMLElement>, value: number) => setRow(value)}
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
						selected={pageBreak}
						onChange={() => setPageBreak(!pageBreak)}
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
			{loading && (
				<Block enableScroll>
					<Spinner />
				</Block>
			)}
			{error && (
				<>
					<Typography className={classes.error} variant="h6" component="div">
						{error}
					</Typography>
				</>
			)}
			<PDFViewer width="100%" height="100%" showToolbar={showToolbar}>
				<Document onRender={onPdfRender}>
					<ReactPDF.Page
						size="A4"
						style={{
							...styles.page,
							paddingBottom: footerDefine.height,
						}}
					>
						{/* Header */}
						<PDFReportHeader formData={formData} page={headerDefine}>
							<PDFReportContent
								pagePadding={pagePadding}
								formSections={formDefine.sections.filter((section: Section) => section.isHeader)}
								formData={formData}
								getOptions={(id: string) => codeListMap[id]}
							/>
						</PDFReportHeader>
						{/* Body */}
						<PDFReportContent
							pagePadding={pagePadding}
							formSections={formDefine.sections.filter((section: Section) => !section?.isHeader)}
							formData={formData}
							getOptions={(id: string) => codeListMap[id]}
						/>
						{imageList && getImageKey && getImageSrc && compareFunction && (
							<PDFImageList<TImage>
								pdfStyle={pdfStyle}
								imageList={imageList}
								getImageKey={getImageKey}
								getImageSrc={getImageSrc}
								compareFunction={compareFunction}
								renderImageDesc={renderImageDesc}
								renderImageNumber={renderImageNumber}
							/>
						)}
						{/* Footer */}
						<PDFReportFooter formData={formData} page={footerDefine} />
					</ReactPDF.Page>
				</Document>
			</PDFViewer>
		</Box>
	);
}

export default ISVReportPDF;
