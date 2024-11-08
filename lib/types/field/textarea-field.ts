import { Field } from './field';

export interface TextareaField extends Field {
	rows?: number;
	placeholder?: string;
	maxLength?: number;
}
