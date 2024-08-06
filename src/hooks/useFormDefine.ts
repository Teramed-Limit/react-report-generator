import React, { useCallback, useEffect, useRef, useState } from 'react';

import { forkJoin, of } from 'rxjs';

import { Field, FormDefine, RepPage } from '../../lib/types';
import { initRepPage, isEmptyOrNil } from '../../lib/utils/general.ts';
import { fakeData, fakeDefine } from '../constant/fake-data';
import { FormDefineMap } from '../types/define.ts';

export const useFormDefine = () => {
	const repTemplateKey = 'ReportTemplate';
	const [formData, setFormData] = React.useState<Record<string, any>>();
	const [formDefine, setFormDefine] = useState<FormDefine>({ sections: [] });
	const [formDefineMap, setFormDefineMap] = useState<FormDefineMap>({});
	const [imageDefine, setImageDefine] = useState<Field[]>([]);
	const [headerDefine, setHeaderDefine] = useState<RepPage>(initRepPage('header') as RepPage);
	const [footerDefine, setFooterDefine] = useState<RepPage>(initRepPage('footer') as RepPage);
	const initFormData = useRef({});
	const prevReportTemplate = useRef<string>();

	const loadFormDefine = useCallback(
		(template: string) => {
			if (isEmptyOrNil(formDefineMap)) return;
			const currentFormDefine = formDefineMap[template];
			if (!currentFormDefine) {
				setFormDefine(formDefineMap.Blank.formDefine);
				setImageDefine([]);
				setHeaderDefine(initRepPage('header') as RepPage);
				setFooterDefine(initRepPage('footer') as RepPage);
			} else {
				setFormDefine(currentFormDefine.formDefine);
				setImageDefine(currentFormDefine.imageDefine);
				setHeaderDefine(currentFormDefine.headerDefine as RepPage);
				setFooterDefine(currentFormDefine.footerDefine as RepPage);
			}
			prevReportTemplate.current = template;
			setFormData({ ...initFormData.current, [repTemplateKey]: template });
		},
		[formDefineMap],
	);

	useEffect(() => {
		// 模擬 API 取得表單定義、取得表單內容
		forkJoin([of(fakeDefine), of(fakeData)]).subscribe(([fetchedFormDefineMap, repFormData]) => {
			setFormDefineMap(fetchedFormDefineMap);
			setFormData(repFormData);
			// ReportTemplate是用來切換表單定義的 key，不需要放入表單內容
			initFormData.current = { ...repFormData };
		});
	}, []);

	return {
		formData,
		setFormData,
		formDefineMap,
		formDefine,
		setFormDefine,
		imageDefine,
		setImageDefine,
		headerDefine,
		setHeaderDefine,
		footerDefine,
		setFooterDefine,
		loadFormDefine,
	};
};
