import { FormState } from '..';

export type ISVReportHandle = {
	getFormData(): Record<string, any[]>;
	getFormState(): FormState;
	isFormValid(): boolean;
	setFormData(data: Record<string, any>): void;
	valueChanged(path: (string | number)[], value: any): void;
};
