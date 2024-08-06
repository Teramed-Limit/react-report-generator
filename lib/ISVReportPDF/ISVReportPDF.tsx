import React, { useCallback, useEffect, useRef, useState } from 'react';

import Typography from '@mui/material/Typography';
import ReactPDF from '@react-pdf/renderer';
import { useRecoilValue } from 'recoil';
import { Observable, Subject, switchMap } from 'rxjs';

import { codeListMapAtom } from '../recoil/atoms/codeListAtom.ts';
import { FormDefine, RepPage, Section } from '../types';
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
	pagePadding: number;
	formDefine: FormDefine;
	formData: Record<string, any>;
	headerDefine: RepPage;
	footerDefine: RepPage;
	onPdfRenderCallback?: (blob: Blob) => void;
	imageList?: any[];
	getImageKey?: (image: TImage) => string;
	getImageSrc?: (image: TImage) => string;
	compareFunction?: (a: TImage, b: TImage) => number;
	renderImageDesc?: (image: TImage) => React.ReactNode;
	renderImageNumber?: (image: TImage) => React.ReactNode;
	imagePerRow?: number;
	imagePageBreak?: boolean;
}

export const padding = 0.2;

export function ISVReportPDF<TImage>({
	showToolbar = false,
	pagePadding,
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
	imagePerRow,
	imagePageBreak,
}: Props<TImage>) {
	// usePDF({ document: MyDoc });

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const codeListMap = useRecoilValue(codeListMapAtom);

	// 創建一個 Subject，監控 PDF 渲染狀態
	const onPdfRenderSubject = useRef(new Subject<Blob>());

	// 確保就算onPdfRender，render好幾次，也只會執行一次callback
	const onPdfRender = useCallback((renderProps: ReactPDF.OnRenderProps) => {
		if (!renderProps?.blob) return;
		onPdfRenderSubject.current.next(renderProps.blob);
	}, []);

	// 配合上方的onPdfRender，利用switchMap確保只會執行一次callback
	useEffect(() => {
		const subscription = onPdfRenderSubject.current
			.pipe(
				switchMap(
					(blob: Blob) =>
						new Observable<Blob>((observer) => {
							observer.next(blob);
							observer.complete();
						}),
				),
			)
			.subscribe({
				next: (blob: Blob) => {
					if (onPdfRenderCallback) onPdfRenderCallback(blob);
					setLoading(false);
				},
				error: (err) => {
					setError(err);
					setLoading(false);
				},
			});
		return () => {
			subscription.unsubscribe();
		};
	}, [onPdfRenderCallback]);

	const getOptions = useCallback((id: string) => codeListMap[id], [codeListMap]);

	const headerSections = formDefine.sections.filter((section: Section) => section?.isHeader);
	const contentSections = formDefine.sections.filter((section: Section) => !section?.isHeader);

	return (
		<>
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
			{
				<ReactPDF.PDFViewer width="100%" height="100%" showToolbar={showToolbar}>
					<ReactPDF.Document onRender={onPdfRender}>
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
									formSections={headerSections}
									formData={formData}
									getOptions={getOptions}
								/>
							</PDFReportHeader>
							{/* Body */}
							<PDFReportContent
								pagePadding={pagePadding}
								formSections={contentSections}
								formData={formData}
								getOptions={getOptions}
							/>
							{imageList &&
								getImageKey &&
								getImageSrc &&
								compareFunction &&
								imagePerRow &&
								imagePageBreak !== undefined && (
									<PDFImageList<TImage>
										pdfStyle={{
											imagePerRow,
											imagePageBreak,
											pagePadding,
										}}
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
					</ReactPDF.Document>
				</ReactPDF.PDFViewer>
			}
		</>
	);
}
