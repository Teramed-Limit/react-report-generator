import { initRepPage } from '../../lib/utils/general.ts';
import { FormDefineMap } from '../types/define.ts';
import { blankDefine, cardiacUltrasoundReportDefine, cystoscopyDefine, gridTableDefine } from './cystoscopy-define.ts';
import { defaultFooterDefine } from './footer-define.ts';
import { defaultHeaderDefine } from './header-define.ts';
import { imageFieldsDefine } from './image-define.ts';

export const fakeDefine: FormDefineMap = {
	Blank: {
		formDefine: blankDefine,
		imageDefine: [],
		headerDefine: initRepPage('header'),
		footerDefine: initRepPage('footer'),
	},
	Colonoscopy: {
		formDefine: cystoscopyDefine,
		imageDefine: imageFieldsDefine,
		headerDefine: defaultHeaderDefine,
		footerDefine: defaultFooterDefine,
	},
	Colonoscopy_MongKok: {
		formDefine: gridTableDefine,
		imageDefine: imageFieldsDefine,
		headerDefine: defaultHeaderDefine,
		footerDefine: defaultFooterDefine,
	},
	CardiacUltrasoundReportDefine: {
		formDefine: cardiacUltrasoundReportDefine as any,
		imageDefine: imageFieldsDefine,
		headerDefine: defaultHeaderDefine,
		footerDefine: defaultFooterDefine,
	},
};

export const fakeData: Record<string, any> = {
	ReportTemplate: 'Colonoscopy',
	PatientName: 'John Doe',
	PatientId: '123456',
	SignatureImage: 'https://picsum.photos/200/200',
};
