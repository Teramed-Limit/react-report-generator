import { atomFamily, DefaultValue, selectorFamily } from 'recoil';
import { FormControl } from '../../types';

// 原子化的欄位值管理 - 每個欄位有獨立的狀態
export const fieldValueAtomFamily = atomFamily<any, string>({
	key: 'fieldValueAtomFamily',
	default: (fieldId: string) => '',
});

// 原子化的欄位狀態管理 - 每個欄位有獨立的驗證狀態
export const fieldStateAtomFamily = atomFamily<FormControl, string>({
	key: 'fieldStateAtomFamily',
	default: (fieldId: string) => ({
		isDirty: false,
		isValid: true,
		errorMessage: '',
	}),
});

// 複合路徑欄位值（用於 Array 和 Composite 欄位）
export const fieldValuePathAtomFamily = atomFamily<any, string>({
	key: 'fieldValuePathAtomFamily',
	default: (pathKey: string) => null,
});

// 複合路徑欄位狀態
export const fieldStatePathAtomFamily = atomFamily<FormControl, string>({
	key: 'fieldStatePathAtomFamily',
	default: (pathKey: string) => ({
		isDirty: false,
		isValid: true,
		errorMessage: '',
	}),
});

// 輔助選擇器：根據路徑獲取值
export const getFieldValueByPath = selectorFamily<any, (string | number)[]>({
	key: 'getFieldValueByPath',
	get:
		(path: (string | number)[]) =>
		({ get }) => {
			if (path.length === 1) {
				// 簡單欄位
				return get(fieldValueAtomFamily(path[0] as string));
			}
			// 複合路徑欄位
			const pathKey = path.join('.');
			return get(fieldValuePathAtomFamily(pathKey));
		},
	set:
		(path: (string | number)[]) =>
		({ set, get }, newValue) => {
			if (newValue instanceof DefaultValue) return;

			if (path.length === 1) {
				// 簡單欄位
				set(fieldValueAtomFamily(path[0] as string), newValue);
			} else {
				// 複合路徑欄位
				const pathKey = path.join('.');
				set(fieldValuePathAtomFamily(pathKey), newValue);
			}
		},
});

// 輔助選擇器：根據路徑獲取狀態
export const getFieldStateByPath = selectorFamily<FormControl, (string | number)[]>({
	key: 'getFieldStateByPath',
	get:
		(path: (string | number)[]) =>
		({ get }) => {
			if (path.length === 1) {
				// 簡單欄位
				return get(fieldStateAtomFamily(path[0] as string));
			}
			// 複合路徑欄位
			const pathKey = path.join('.');
			return get(fieldStatePathAtomFamily(pathKey));
		},
	set:
		(path: (string | number)[]) =>
		({ set }, newValue) => {
			if (newValue instanceof DefaultValue) return;

			if (path.length === 1) {
				// 簡單欄位
				set(fieldStateAtomFamily(path[0] as string), newValue);
			} else {
				// 複合路徑欄位
				const pathKey = path.join('.');
				set(fieldStatePathAtomFamily(pathKey), newValue);
			}
		},
});

// 獲取所有欄位值的選擇器（用於表單提交等場景）
export const getAllFieldValues = selectorFamily<Record<string, any>, string[]>({
	key: 'getAllFieldValues',
	get:
		(fieldIds: string[]) =>
		({ get }) => {
			const values: Record<string, any> = {};
			fieldIds.forEach((fieldId) => {
				values[fieldId] = get(fieldValueAtomFamily(fieldId));
			});
			return values;
		},
});

// 獲取所有欄位狀態的選擇器（用於表單驗證等場景）
export const getAllFieldStates = selectorFamily<Record<string, FormControl>, string[]>({
	key: 'getAllFieldStates',
	get:
		(fieldIds: string[]) =>
		({ get }) => {
			const states: Record<string, FormControl> = {};
			fieldIds.forEach((fieldId) => {
				states[fieldId] = get(fieldStateAtomFamily(fieldId));
			});
			return states;
		},
});
