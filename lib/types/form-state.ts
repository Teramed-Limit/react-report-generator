export interface FormControl {
	isDirty: boolean;
	isValid: boolean;
	errorMessage: string;
}

export type FormControlArray = { [prop: string]: FormControl }[];

export interface FormState {
	[prop: string]: FormControl | FormControlArray;
}
