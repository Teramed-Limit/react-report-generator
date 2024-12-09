# ISVReportPDF 元件

ISVReportPDF 是一個用於生成 PDF 報告的 React 元件。

## 功能特點

-   支援自定義頁面佈局
-   可配置圖片排列方式
-   支援圖片描述和編號
-   提供 PDF 下載功能

## 使用範例

```tsx
import React from 'react';
import { ISVReportPDF } from '../../lib/ISVReportPDF/ISVReportPDF.tsx';
import { ReportImageData } from '../../lib/types/report-image-data.ts';

function ReportPDF() {
  const [pdfBlob, setPdfBlob] = React.useState<Blob>(null);

  return (
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
      getImageKey={(image) => image.SOPInstanceUID}
      getImageSrc={(image) => image.ImageSrc}
      compareFunction={(a, b) => (a.MappingNumber > b.MappingNumber ? 1 : -1)}
      renderImageDesc={(image) => (/* 自定義圖片描述渲染 */)}
      renderImageNumber={(image) => (/* 自定義圖片編號渲染 */)}
    />
  );
}
```

## Props

| 屬性名稱            | 類型     | 必填 | 說明                   |
| ------------------- | -------- | ---- | ---------------------- |
| showToolbar         | boolean  | 否   | 是否顯示工具列         |
| pagePadding         | number   | 否   | 頁面邊距               |
| formData            | object   | 是   | 表單資料物件           |
| formDefine          | object   | 是   | 表單定義物件           |
| headerDefine        | object   | 否   | 頁首定義物件           |
| footerDefine        | object   | 否   | 頁尾定義物件           |
| imageList           | array    | 是   | 圖片列表               |
| imagePerRow         | number   | 否   | 每行顯示的圖片數量     |
| imagePageBreak      | boolean  | 否   | 是否在圖片間添加分頁   |
| onPdfRenderCallback | function | 否   | PDF 渲染完成的回調函數 |
| getImageKey         | function | 是   | 獲取圖片唯一鍵的函數   |
| getImageSrc         | function | 是   | 獲取圖片來源的函數     |
| compareFunction     | function | 否   | 圖片排序比較函數       |
| renderImageDesc     | function | 否   | 自定義圖片描述渲染函數 |
| renderImageNumber   | function | 否   | 自定義圖片編號渲染函數 |

## 泛型類型

元件支援泛型類型定義，用於指定圖片資料的類型：

```tsx
interface ReportImageData {
	SOPInstanceUID: string;
	ImageSrc: string;
	MappingNumber: number;
	// 其他圖片相關屬性
}
```
