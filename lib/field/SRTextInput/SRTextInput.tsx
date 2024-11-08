import React from 'react';

import { SRTextField } from '../../types/field/sr-text-field';
import BaseTextInput from '../../UI/BaseTextInput/BaseTextInput.tsx';

interface Props {
	id: string;
	field: SRTextField;
	value: string;
	onValueChange: (value: string) => void;
	disabled: boolean;
}

function SRTextInput({ id, field, value, onValueChange, disabled }: Props) {
	function evaluateFormula(formula: string | undefined): string {
		if (!formula) return value;

		// 將公式中的 'x' 替換為提供的值
		const replacedFormula = formula.replace(/x/g, value.toString());

		try {
			// 使用 eval 函數來計算公式的值
			// eslint-disable-next-line no-eval
			const result = eval(replacedFormula);

			if (typeof result === 'number' && !Number.isNaN(result)) {
				return result.toString();
			}
			return value;
		} catch (error) {
			console.error('計算公式時出現錯誤：', error);
			return value;
		}
	}

	function daysToWeeksAndDays(days: number): { weeks: number; remainingDays: number } {
		const weeks = Math.floor(days / 7);
		const remainingDays = days % 7;
		return { weeks, remainingDays };
	}

	// 計算公式的值
	let formattedValue = evaluateFormula(field?.formula);

	// 將天數轉換為週數
	if (field.daysToWeeks) {
		const days = +value;
		if (!Number.isNaN(days)) {
			const { weeks, remainingDays } = daysToWeeksAndDays(days);
			formattedValue = `${weeks}w${remainingDays}d`;
		}
	}

	return (
		<BaseTextInput
			id={id}
			placeholder={field?.placeholder || ''}
			disabled={disabled || field.readOnly}
			value={formattedValue}
			onValueChange={onValueChange}
			prefix={field.prefix}
			suffix={field.suffix}
		/>
	);
}

export default SRTextInput;
