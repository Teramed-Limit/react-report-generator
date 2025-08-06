import React, { useCallback, useMemo } from 'react';

import AttributeList from '../../../../attribute/AttributeList/AttributeList.tsx';
import { RepComponentAttribute } from '../../../../types/report-generator/rep-attribute.ts';
import ColorPickerButton from '../../../../UI/ColorPickerButton/ColorPickerButton.tsx';
import ExpandToggler from '../../../../UI/ExpandToggler/ExpandToggler.tsx';
import FontNameSelection from '../../../ReportDefine/Attribute/Common/FontNameSelection/FontNameSelection';
import FontStyleSelection from '../../../ReportDefine/Attribute/Common/FontStyleSelection/FontStyleSelection';
import FontWeightSelection from '../../../ReportDefine/Attribute/Common/FontWeightSelection/FontWeightSelection';

interface Props {
	compAttribute?: RepComponentAttribute;
	onSetCompAttribute: (uuid: string, attrPath: (number | string)[], attrValue: number | string | boolean) => void;
}

function ReportComponentAttributeList({ compAttribute = undefined, onSetCompAttribute }: Props) {
	// 使用 useCallback 記憶化函數，避免每次渲染都創建新函數
	const setAttribute = useCallback(
		(attrName: (string | number)[], attrValue: any) => {
			if (!compAttribute?.uuid) return;
			onSetCompAttribute(compAttribute.uuid, attrName, attrValue);
		},
		[compAttribute?.uuid, onSetCompAttribute],
	);

	// 使用 useMemo 記憶化條件檢查，避免不必要的重新計算
	const hasCanvasAttribute = useMemo(
		() =>
			compAttribute?.x1 !== undefined &&
			compAttribute?.x2 !== undefined &&
			compAttribute?.y1 !== undefined &&
			compAttribute?.y2 !== undefined &&
			compAttribute?.color !== undefined &&
			compAttribute?.thickness !== undefined,
		[
			compAttribute?.x1,
			compAttribute?.x2,
			compAttribute?.y1,
			compAttribute?.y2,
			compAttribute?.color,
			compAttribute?.thickness,
		],
	);

	const hasOthersAttribute = useMemo(
		() => compAttribute?.showTotalPages !== undefined,
		[compAttribute?.showTotalPages],
	);

	const hasValueAttribute = useMemo(
		() => compAttribute?.value !== undefined || compAttribute?.src !== undefined,
		[compAttribute?.value, compAttribute?.src],
	);

	const hasFontAttribute = useMemo(
		() =>
			compAttribute?.fontColor !== undefined &&
			compAttribute?.fontSize !== undefined &&
			compAttribute?.fontName !== undefined &&
			compAttribute?.fontWeight !== undefined &&
			compAttribute?.fontStyle !== undefined,
		[
			compAttribute?.fontColor,
			compAttribute?.fontSize,
			compAttribute?.fontName,
			compAttribute?.fontWeight,
			compAttribute?.fontStyle,
		],
	);

	// 使用 useMemo 記憶化屬性物件，只有當相關值改變時才重新創建
	const layoutAttribute = useMemo(
		() => ({
			x: compAttribute?.x,
			y: compAttribute?.y,
			width: compAttribute?.width,
			height: compAttribute?.height,
		}),
		[compAttribute?.x, compAttribute?.y, compAttribute?.width, compAttribute?.height],
	);

	const fontAttribute = useMemo(
		() => ({
			fontColor: compAttribute?.fontColor,
			fontSize: compAttribute?.fontSize,
			fontName: compAttribute?.fontName,
			fontWeight: compAttribute?.fontWeight,
			fontStyle: compAttribute?.fontStyle,
		}),
		[
			compAttribute?.fontColor,
			compAttribute?.fontSize,
			compAttribute?.fontName,
			compAttribute?.fontWeight,
			compAttribute?.fontStyle,
		],
	);

	const valueAttribute = useMemo(
		() => ({
			value: compAttribute?.value,
		}),
		[compAttribute?.value],
	);

	const srcAttribute = useMemo(
		() => ({
			src: compAttribute?.src,
		}),
		[compAttribute?.src],
	);

	const othersAttribute = useMemo(
		() => ({
			showTotalPages: compAttribute?.showTotalPages,
		}),
		[compAttribute?.showTotalPages],
	);

	const canvasAttribute = useMemo(
		() => ({
			x1: compAttribute?.x1,
			x2: compAttribute?.x2,
			y1: compAttribute?.y1,
			y2: compAttribute?.y2,
			color: compAttribute?.color,
			thickness: compAttribute?.thickness,
		}),
		[
			compAttribute?.x1,
			compAttribute?.x2,
			compAttribute?.y1,
			compAttribute?.y2,
			compAttribute?.color,
			compAttribute?.thickness,
		],
	);

	// 記憶化 attributeComponentMapper
	const fontAttributeComponentMapper = useMemo(
		() => ({
			fontColor: ColorPickerButton,
			fontName: FontNameSelection,
			fontWeight: FontWeightSelection,
			fontStyle: FontStyleSelection,
		}),
		[],
	);

	const canvasAttributeComponentMapper = useMemo(
		() => ({
			color: ColorPickerButton,
		}),
		[],
	);

	return (
		<>
			{/* Layout */}
			<ExpandToggler title="Layout">
				<AttributeList attribute={layoutAttribute} setAttribute={setAttribute} />
			</ExpandToggler>
			{/* Font */}
			{hasFontAttribute && (
				<ExpandToggler title="Font">
					<AttributeList
						attribute={fontAttribute}
						setAttribute={setAttribute}
						attributeComponentMapper={fontAttributeComponentMapper}
					/>
				</ExpandToggler>
			)}
			{/* Miscellaneous */}
			{hasValueAttribute && (
				<ExpandToggler title="Miscellaneous">
					<AttributeList attribute={valueAttribute} setAttribute={setAttribute} />
					<AttributeList attribute={srcAttribute} setAttribute={setAttribute} />
				</ExpandToggler>
			)}
			{/* Others */}
			{hasOthersAttribute && (
				<ExpandToggler title="Others">
					<AttributeList attribute={othersAttribute} setAttribute={setAttribute} />
				</ExpandToggler>
			)}
			{/* Canvas */}
			{hasCanvasAttribute && (
				<ExpandToggler title="Canvas">
					<AttributeList
						attribute={canvasAttribute}
						attributeComponentMapper={canvasAttributeComponentMapper}
						setAttribute={setAttribute}
					/>
				</ExpandToggler>
			)}
		</>
	);
}

export default React.memo(ReportComponentAttributeList);
