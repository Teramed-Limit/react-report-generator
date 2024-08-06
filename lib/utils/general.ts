import { format, parse } from 'date-fns';
import * as R from 'ramda';

import { FieldMetaInfo, FormControl, FormControlArray, RepPage } from '../types';

export const generateUUID = () => {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

export const coerceArray = (ary: string | any[]) => {
	if (Array.isArray(ary)) {
		return ary;
	}
	return [ary];
};

export const trim = (str: string) => str.replace(/^\s+|\s+$/gm, '');

export const isEmptyOrNil = (value: any) => {
	return R.isEmpty(value) || R.isNil(value);
};

export const isNotEmptyOrNil = (value: any) => {
	return !R.isEmpty(value) && !R.isNil(value);
};

export const isEmptyList = (value: any[] | undefined) => {
	if (!value) return false;
	return value?.length === 0;
};

export const isNotEmptyList = (value: any[] | undefined) => {
	if (!value) return false;
	return value?.length > 0;
};

export function uniqBy(list: any[], key) {
	const seen = {};
	return list.filter((item) => {
		const k = key(item);
		return Object.prototype.hasOwnProperty.call(seen, k) ? false : (seen[k] = true);
	});
}

export const reorder = <T>(list: Array<T>, startIndex, endIndex): Array<T> => {
	const result = [...list];
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result.slice();
};

export const emptyBaseImage = () =>
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';

export const convertFileToBase64 = (file: File) => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);

		fileReader.onload = () => {
			resolve(fileReader.result);
		};

		fileReader.onerror = (error) => {
			reject(error);
		};
	});
};

export const convertUrlToBase64 = async (url): Promise<string> => {
	const data = await fetch(url);
	const blob = await data.blob();
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onloadend = () => {
			const base64data = reader.result as string;
			resolve(base64data);
		};
	});
};

export function camelize(str) {
	return str.replace(/^\w|[A-Z]|\b\w|\s+/g, (match, index) => {
		if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
		return index === 0 ? match.toUpperCase() : match.toUpperCase();
	});
}

export function deepCopy(obj) {
	return JSON.parse(JSON.stringify(obj));
}

export const readBase64 = (file): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
		reader.readAsDataURL(file);
	});
};

export const dateFormatString = (value: string | Date, fromFormat: string = 'yyyyMMdd') => {
	try {
		if (value instanceof Date) {
			return format(value, fromFormat);
		}
		return format(new Date(value), fromFormat);
	} catch {
		return '';
	}
};

export const stringFormatDate = (value: string, fromFormat: string): Date => {
	return parse(value, fromFormat, new Date());
};

export const convertToDate = (value: string | Date, fromFormat: string) => {
	try {
		if (value instanceof Date) {
			return format(value, fromFormat);
		}
		return format(new Date(value), fromFormat);
	} catch {
		return '';
	}
};

export function updateNestedKey(obj: Record<string, any>, targetKey: string, value: any): Record<string, any> {
	if (Array.isArray(obj)) {
		return obj.map((item) =>
			typeof item === 'object' && item !== null ? updateNestedKey(item, targetKey, value) : item,
		);
	}

	const updatedObj = { ...obj };
	Object.keys(updatedObj).forEach((key) => {
		if (key === targetKey) {
			updatedObj[key] = value;
		} else if (typeof updatedObj[key] === 'object' && updatedObj[key] !== null) {
			updatedObj[key] = updateNestedKey(updatedObj[key], targetKey, value);
		}
	});
	return updatedObj;
}

export const initRepPage = (name): RepPage => ({
	name,
	width: 595,
	height: 100,
	paddingBottom: 0,
	paddingLeft: 0,
	paddingRight: 0,
	paddingTop: 0,
	components: {},
});

export function isFormControl(value: any): value is FormControl {
	return (
		typeof value === 'object' &&
		value !== null &&
		'isDirty' in value &&
		'isValid' in value &&
		'errorMessage' in value &&
		typeof value.isDirty === 'boolean' &&
		typeof value.isValid === 'boolean' &&
		typeof value.errorMessage === 'string'
	);
}

export function isFormControlArray(value: any): value is FormControlArray {
	return (
		Array.isArray(value) &&
		value.every((item) => typeof item === 'object' && item !== null && Object.values(item).every(isFormControl))
	);
}

export function isFieldMetaInfo(obj: any): obj is FieldMetaInfo {
	return obj && obj.path && obj.field;
}

export function isFieldMetaMapInfo(obj: any): obj is Record<string, FieldMetaInfo> {
	return obj && Object.keys(obj).length > 0 && isFieldMetaInfo(obj[Object.keys(obj)[0]]);
}
