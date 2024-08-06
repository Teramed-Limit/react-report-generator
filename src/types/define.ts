import { Field, FormDefine, RepPage } from '../../lib/types';

export type FormDefineMap = Record<
	string,
	{
		formDefine: FormDefine;
		imageDefine: Field[];
		headerDefine: RepPage;
		footerDefine: RepPage;
	}
>;
