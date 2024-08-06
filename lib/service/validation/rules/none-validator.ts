import { ValidateResult, Validator } from '../validator.ts';

export class NoneValidator extends Validator {
	errorMessage = '';

	validate(value: any, validateParams: any, formData: Record<string, any>): ValidateResult {
		return {
			isValid: true,
			errorMessage: '',
		};
	}
}
