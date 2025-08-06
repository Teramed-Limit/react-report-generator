import { Style } from '@react-pdf/types/style';

import { Validate } from '../validate.ts';

import { ButtonMeta, Field } from './field';

export interface CompositeInnerField extends Field {
	readOnly: boolean;
	initMapping?: string;
	validate?: Validate;
	valueStyle: Style;
	buttonBar?: ButtonMeta[];
}
