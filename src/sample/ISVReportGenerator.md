# ISVReportGenerator 元件

ISVReportGenerator 是一個用於生成和編輯報告模板的 React 元件。

## 功能特點

-   支援報告模板的編輯和預覽
-   可自定義頁首、頁尾
-   支援圖片定義
-   支援字型設定

## 使用範例

```tsx
import React, { useRef } from 'react';
import { ISVReportGenerator } from '../../lib/main.ts';
import { ISVReportGeneratorHandle } from '../../lib/types/component-handle';

function ReportGenerator() {
	const isvReportGeneratorHandleRef = useRef<ISVReportGeneratorHandle>();

	const saveReportDefine = () => {
		setFormData(isvReportGeneratorHandleRef.current?.getFormData() || {});
		setHeaderDefine(isvReportGeneratorHandleRef.current?.getHeaderDefine());
		setFooterDefine(isvReportGeneratorHandleRef.current?.getFooterDefine());
		setFormDefine(isvReportGeneratorHandleRef.current?.getFormDefine());
		setImageDefine(isvReportGeneratorHandleRef.current?.getImageDefine());
	};

	return (
		<ISVReportGenerator
			ref={isvReportGeneratorHandleRef}
			formData={formData}
			formDefine={formDefine}
			fonts={fonts}
			imageDefine={imageDefine}
			headerDefine={headerDefine}
			footerDefine={footerDefine}
			codeList={codeList}
		/>
	);
}
```

## Props

| 屬性名稱     | 類型   | 必填 | 說明         |
| ------------ | ------ | ---- | ------------ |
| formData     | object | 是   | 表單資料物件 |
| formDefine   | object | 是   | 表單定義物件 |
| fonts        | array  | 是   | 字型定義陣列 |
| imageDefine  | array  | 否   | 圖片定義陣列 |
| headerDefine | object | 否   | 頁首定義物件 |
| footerDefine | object | 否   | 頁尾定義物件 |
| codeList     | object | 是   | 代碼列表物件 |

## Methods

透過 ref 可以存取以下方法：

| 方法名稱          | 說明             |
| ----------------- | ---------------- |
| getFormData()     | 獲取當前表單資料 |
| getHeaderDefine() | 獲取頁首定義     |
| getFooterDefine() | 獲取頁尾定義     |
| getFormDefine()   | 獲取表單定義     |
| getImageDefine()  | 獲取圖片定義     |
