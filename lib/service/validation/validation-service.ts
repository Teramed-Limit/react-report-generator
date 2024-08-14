import { Validate } from '../../types/validate.ts';
import { RequireValidator } from './rules/require-validator';
import { ValidateResult, Validator } from './validator';

export class ValidationService {
	validator: Validator | undefined;

	factoryMapper = new Map<string, Validator>();

	constructor() {
		this.factoryMapper.set('required', new RequireValidator());
	}

	validate = (value: any, rule: Validate, formValue: Record<string, any>): ValidateResult => {
		if (!rule?.type) {
			return { isValid: true, errorMessage: '' };
		}

		this.validator = this.factoryMapper.get(rule.type);
		if (!this.validator) {
			console.error(`validator: ${rule.type} not found`);
			return new Validator().validate(value, rule.params, formValue);
		}

		return this.validator.validate(value, rule.params, formValue);
	};
}
