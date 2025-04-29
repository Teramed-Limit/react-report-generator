import React, { useCallback, useEffect, useRef, useState } from 'react';

import Typography from '@mui/material/Typography';
import ReactPDF, { OnRenderProps, View } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
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
	/** 是否顯示 PDF 查看器的工具欄 */
	showToolbar?: boolean;
	/** PDF 頁面的內邊距（單位：英寸或點） */
	pagePadding: number;
	/** 表單結構定義，包含了各個區塊和字段的配置 */
	formDefine: FormDefine;
	/** 表單數據，鍵值對形式存儲各字段的值 */
	formData: Record<string, any>;
	/** 頁眉定義，包含頁眉的高度和其他配置 */
	headerDefine: RepPage;
	/** 頁腳定義，包含頁腳的高度和其他配置 */
	footerDefine: RepPage;
	/** PDF 渲染完成後的回調函數，接收生成的 Blob 對象 */
	onPdfRenderCallback?: (blob: Blob) => void;
	/** 需要在 PDF 中顯示的圖片列表 */
	imageList?: TImage[];
	/** 從圖片對象中獲取唯一標識符的函數 */
	getImageKey?: (image: TImage) => string;
	/** 從圖片對象中獲取圖片源 URL 的函數 */
	getImageSrc?: (image: TImage) => string;
	/** 圖片排序比較函數 */
	compareFunction?: (a: TImage, b: TImage) => number;
	/** 自定義渲染圖片描述的函數 */
	renderImageDesc?: (image: TImage) => React.ReactNode;
	/** 自定義渲染圖片編號的函數 */
	renderImageNumber?: (image: TImage) => React.ReactNode;
	/** 每行顯示的圖片數量 */
	imagePerRow?: number;
	/** 是否在圖片區域後添加分頁符 */
	imagePageBreak?: boolean;
	/** 內容容器的自定義樣式 */
	contentContainerStyle?: Style;
	/** 主要內容容器的自定義樣式 */
	mainContentStyle?: Style;
	/** 自定義內容組件，將在主內容區域之後渲染 */
	contentComponent?: React.ReactNode;
	/** 自定義內容組件Header，將在主內容上方區域渲染 */
	contentHeaderComponent?: React.ReactNode;
	/** 自定義內容組件Footer，將在主內容下方區域渲染 */
	contentFooterComponent?: React.ReactNode;
	/** 圖片容器的自定義樣式 */
	imgContainerStyle?: Style;
	/** 自定義圖片組件，將在圖片列表之後渲染 */
	// imgComponent?: React.ReactNode;
	/** 自定義圖片組件Header，將在圖片列表上方區域渲染 */
	imgHeaderComponent?: React.ReactNode;
	/** 自定義圖片組件Footer，將在圖片列表下方區域渲染 */
	imgFooterComponent?: React.ReactNode;
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
	contentContainerStyle,
	contentComponent,
	mainContentStyle,
	contentHeaderComponent,
	contentFooterComponent,
	imgContainerStyle,
	// imgComponent,
	imgHeaderComponent,
	imgFooterComponent,
}: Props<TImage>) {
	// usePDF({ document: MyDoc });

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const codeListMap = useRecoilValue(codeListMapAtom);

	// 創建一個 Subject，監控 PDF 渲染狀態
	const onPdfRenderSubject = useRef(new Subject<Blob>());

	// 確保就算 onPdfRender 被調用多次，也只會執行一次 callback
	const onPdfRender = useCallback((renderProps: OnRenderProps) => {
		if (!renderProps?.blob) return;
		onPdfRenderSubject.current.next(renderProps.blob);
	}, []);

	// 配合上方的 onPdfRender，利用 switchMap 確保只會執行一次 callback
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

	// 將表單區塊分為頁眉部分和內容部分
	const headerSections = formDefine.sections.filter((section: Section) => section?.isHeader);
	const contentSections = formDefine.sections.filter((section: Section) => !section?.isHeader);

	// 檢查圖片相關屬性是否都已提供，以便正確渲染圖片列表
	const shouldRenderImageList =
		imageList &&
		imageList.length > 0 &&
		getImageKey &&
		getImageSrc &&
		imagePerRow !== undefined &&
		imagePageBreak !== undefined;

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
							{/* 頁首 */}
							<PDFReportHeader formData={formData} page={headerDefine}>
								<View
									style={{ width: '100%', ...contentContainerStyle, paddingHorizontal: pagePadding }}
								>
									<PDFReportContent
										formSections={headerSections}
										formData={formData}
										getOptions={getOptions}
									/>
								</View>
							</PDFReportHeader>

							{/* 內容 */}
							<View style={{ width: '100%', ...contentContainerStyle, paddingHorizontal: pagePadding }}>
								{/* 內容客製化Header */}
								{contentHeaderComponent}
								{/* 內容主體 */}
								<View style={{ width: '100%', ...mainContentStyle }}>
									<PDFReportContent
										formSections={contentSections}
										formData={formData}
										getOptions={getOptions}
									/>
									{contentComponent}
								</View>
								{/* 內容客製化Footer */}
								{contentFooterComponent}
							</View>

							{/* 圖片內容 */}
							<View
								style={{ width: '100%', ...imgContainerStyle, paddingHorizontal: pagePadding }}
								break={imagePageBreak}
							>
								{/* 圖片客製化Header */}
								{imgHeaderComponent}
								{shouldRenderImageList && (
									<PDFImageList<TImage>
										imageList={imageList}
										imagePerRow={imagePerRow}
										getImageKey={getImageKey}
										getImageSrc={getImageSrc}
										compareFunction={compareFunction}
										renderImageDesc={renderImageDesc}
										renderImageNumber={renderImageNumber}
									/>
								)}
								{/* 圖片客製化Footer */}
								{imgFooterComponent}
							</View>

							{/* 頁尾巴 */}
							<PDFReportFooter formData={formData} page={footerDefine} />
						</ReactPDF.Page>
					</ReactPDF.Document>
				</ReactPDF.PDFViewer>
			}
		</>
	);
}
