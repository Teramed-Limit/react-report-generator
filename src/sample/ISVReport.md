# ISVReport 元件

ISVReport 是一個用於顯示和編輯結構化報告的 React 元件。

## 功能特點

-   根據表單定義動態渲染表單
-   支援表單資料的讀取和保存
-   提供表單驗證功能
-   支援自定義按鈕動作

## 使用範例

```tsx
import React, { useRef } from 'react';
import { ISVReport } from '../../lib/main.ts';
import { ISVReportHandle } from '../../lib/types/component-handle';

function Report() {
	const isvReportRef = useRef<ISVReportHandle>();

	const saveReportData = () => {
		const formState = isvReportRef.current?.getFormState() || {};
		const isFormValidate = isvReportRef.current?.isFormValid();
		console.log('Form Data:', isvReportRef.current?.getFormData());
	};

	return (
		<ISVReport
			ref={isvReportRef}
			formData={formData}
			formDefine={formDefine}
			formDisabled={false}
			defineChangeTriggerId="ReportTemplate"
			defineChangeTriggerCallBack={loadFormDefine}
			codeList={codeList}
			structReportParseApi="http://localhost:61818/api/structureReport/load"
			buttonActionMap={{
				createTemplate: (field) => {
					window.alert('Create Template');
				},
			}}
		/>
	);
}
```

## Props

| 屬性名稱                    | 類型     | 必填 | 說明                               |
| --------------------------- | -------- | ---- | ---------------------------------- |
| formData                    | object   | 是   | 表單資料物件                       |
| formDefine                  | object   | 是   | 表單定義物件，定義表單的結構和欄位 |
| formDisabled                | boolean  | 否   | 是否禁用整個表單                   |
| defineChangeTriggerId       | string   | 否   | 觸發表單定義變更的ID               |
| defineChangeTriggerCallBack | function | 否   | 表單定義變更時的回調函數           |
| codeList                    | object   | 是   | 代碼列表物件，用於下拉選單等選項   |
| structReportParseApi        | string   | 否   | 結構化報告解析API的端點            |
| buttonActionMap             | object   | 否   | 自定義按鈕動作的映射物件           |

## Methods

透過 ref 可以存取以下方法：

| 方法名稱       | 說明             |
| -------------- | ---------------- |
| getFormData()  | 獲取當前表單資料 |
| getFormState() | 獲取表單狀態     |
| isFormValid()  | 檢查表單是否有效 |

</rewritten_file>
