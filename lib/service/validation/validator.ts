export interface ValidatorImp {
	errorMessage: string;
	validate: (value: any, validateParams: any, formData: Record<string, any>) => ValidateResult;
}

export interface ValidateResult {
	isValid: boolean;
	errorMessage: string;
}

export class Validator implements ValidatorImp {
	errorMessage = '';

	validate(value: any, validateParams: any, formData: Record<string, any>): ValidateResult {
		return {
			isValid: true,
			errorMessage: this.errorMessage,
		};
	}
}
