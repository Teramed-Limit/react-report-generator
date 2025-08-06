import { CSSProperties } from 'react';
import { Field, FormDefine, SRTreeNode } from '../../types';

// 更嚴格的 Props 類型定義
export interface ISVReportProps {
	formDefine: FormDefine;
	formData: Record<string, unknown>;
	formDisabled?: boolean;
	srTreeNode?: SRTreeNode;
	codeList: Record<string, unknown[]>;
	buttonActionMap?: Record<string, (field: Field) => void>;
	structReportParseApi?: string;
	defineChangeTriggerId: string;
	defineChangeTriggerCallBack: (template: string) => void;
	pageStyle?: {
		pageContainer?: CSSProperties;
		page?: CSSProperties;
	};
	showFlowButton?: boolean;
}

// 內部狀態類型
export interface ReportInternalState {
	isFormDataSet: boolean;
	isFormDefineSet: boolean;
	isFormConfigSet: boolean;
	scale: number;
}

// 錯誤類型
export enum ReportErrorType {
	INITIALIZATION_ERROR = 'INITIALIZATION_ERROR',
	VALIDATION_ERROR = 'VALIDATION_ERROR',
	DATA_SYNC_ERROR = 'DATA_SYNC_ERROR',
}

export interface ReportError {
	type: ReportErrorType;
	message: string;
	details?: unknown;
}

// 載入狀態類型
export interface LoadingState {
	isLoading: boolean;
	loadingMessage?: string;
	progress?: number;
}
