import { isEmptyOrNil } from '../../../utils/general';
import { ValidateResult, Validator } from '../validator.ts';

export class RequireValidator extends Validator {
	errorMessage = 'This field is required';

	validate(value: any, validateParams: any, formData: Record<string, any>): ValidateResult {
		return isEmptyOrNil(value)
			? {
					isValid: false,
					errorMessage: this.errorMessage,
				}
			: {
					isValid: true,
					errorMessage: '',
				};
	}
}
