import { Field, FormDefine, RepPage } from '..';

export type ISVReportGeneratorHandle = {
	getFormData(): Record<string, any>;
	getFormDefine(): FormDefine;
	getImageDefine(): Field[];
	getHeaderDefine(): RepPage;
	getFooterDefine(): RepPage;
};
