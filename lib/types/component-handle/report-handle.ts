import { FormState } from '..';

export type ISVReportHandle = {
	getFormData(): Record<string, any[]>;
	getFormState(): FormState;
	isFormValid(): boolean;
};
