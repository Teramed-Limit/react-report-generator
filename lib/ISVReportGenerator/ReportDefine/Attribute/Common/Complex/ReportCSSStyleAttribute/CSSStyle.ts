import {
	AlignContent,
	AlignItems,
	AlignSelf,
	BorderStyleValue,
	Display,
	FlexDirection,
	FlexWrap,
	JustifyContent,
	Position,
	TextTransform,
	Transform,
	VerticalAlign,
} from '@react-pdf/stylesheet';
import { Style } from '@react-pdf/types/style';

export class CSSStyle implements Style {
	[key: `@media${string}`]: Style;

	// Flexbox
	// alignContent?:
	//     | 'flex-start'
	//     | 'flex-end'
	//     | 'center'
	//     | 'stretch'
	//     | 'space-between'
	//     | 'space-around';
	// alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
	// alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
	// flex?: number | string;
	// flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
	// flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
	// flexFlow?: number;
	// flexGrow?: number;
	// flexShrink?: number;
	// flexBasis?: number | string;
	// justifyContent?:
	//     | 'flex-start'
	//     | 'flex-end'
	//     | 'center'
	//     | 'space-around'
	//     | 'space-between'
	//     | 'space-evenly';

	// Layout
	// bottom?: number | string;
	// display?: 'flex' | 'none';
	// left?: number | string;
	// position?: 'absolute' | 'relative';
	// right?: number | string;
	// top?: number | string;
	// overflow?: 'hidden';
	// zIndex?: number | string;

	// Dimension
	// height?: number | string;
	// maxHeight?: number | string;
	// maxWidth?: number | string;
	// minHeight?: number | string;
	// minWidth?: number | string;
	// width?: number | string;

	// Color
	backgroundColor?: string;
	color?: string;
	// opacity?: number;

	// Text
	fontSize?: number;
	fontFamily?: string;
	fontStyle?: 'normal' | 'italic' | 'oblique';
	fontWeight?:
		| number
		| 'thin'
		| 'hairline'
		| 'ultralight'
		| 'extralight'
		| 'light'
		| 'normal'
		| 'medium'
		| 'semibold'
		| 'demibold'
		| 'bold'
		| 'ultrabold'
		| 'extrabold'
		| 'heavy'
		| 'black';
	// letterSpacing?: number | string;
	// lineHeight?: number | string;
	// // maxLines?: number; // ?
	textAlign?: 'left' | 'right' | 'center' | 'justify'; // ?
	textDecoration?: 'line-through' | 'underline' | 'none' | 'line-through underline' | 'underline line-through';
	// textDecorationColor?: string;
	// textDecorationStyle?: 'dashed' | 'dotted' | 'solid' | string; // ?
	// textIndent?: any; // ?
	// textOverflow?: 'ellipsis';
	// textTransform?: 'capitalize' | 'lowercase' | 'uppercase';

	// Sizing/positioning
	// objectFit?: string;
	// objectPosition?: number | string;
	// objectPositionX?: number | string;
	// objectPositionY?: number | string;

	// Margin/padding
	// margin?: number | string;
	// marginHorizontal?: number | string;
	// marginVertical?: number | string;
	marginTop?: number | string;
	marginRight?: number | string;
	marginBottom?: number | string;
	marginLeft?: number | string;
	// padding?: number | string;
	// paddingHorizontal?: number | string;
	// paddingVertical?: number | string;
	paddingTop?: number | string;
	paddingRight?: number | string;
	paddingBottom?: number | string;
	paddingLeft?: number | string;

	// Transformations
	// transform?: string;
	// transformOrigin?: number | string;
	// transformOriginX?: number | string;
	// transformOriginY?: number | string;

	// Borders
	// border?: number | string;
	// borderWidth?: number | string;
	borderColor?: string;
	borderStyle?: 'dashed' | 'dotted' | 'solid';
	borderTop?: number | string;
	// borderTopColor?: string;
	// borderTopStyle?: 'dashed' | 'dotted' | 'solid'; // ?
	// borderTopWidth?: number | string;
	borderRight?: number | string;
	// borderRightColor?: string;
	// borderRightStyle?: 'dashed' | 'dotted' | 'solid'; // ?
	// borderRightWidth?: number | string;
	borderBottom?: number | string;
	// borderBottomColor?: string;
	// borderBottomStyle?: 'dashed' | 'dotted' | 'solid'; // ?
	// borderBottomWidth?: number | string;
	borderLeft?: number | string;
	// borderLeftColor?: string;
	// borderLeftStyle?: 'dashed' | 'dotted' | 'solid'; // ?
	// borderLeftWidth?: number | string;
	// borderTopLeftRadius?: number | string;
	// borderTopRightRadius?: number | string;
	// borderBottomRightRadius?: number | string;
	// borderBottomLeftRadius?: number | string;
	// borderRadius?: number | string;

	constructor(style?: CSSStyle) {
		// Font
		this.fontSize = style?.fontSize || 10;
		this.fontFamily = style?.fontFamily || 'Microsoft JhengHei';
		this.fontStyle = style?.fontStyle || 'normal';
		this.fontWeight = style?.fontWeight || 600;
		this.textAlign = style?.textAlign || 'left';

		// Color
		this.backgroundColor = style?.backgroundColor || 'transparent';
		this.color = style?.color || 'black';
		// this.opacity = style?.opacity || 1;

		// Margin/padding
		// this.margin = style?.margin || 0;
		this.marginTop = style?.marginTop || 0;
		this.marginRight = style?.marginRight || 0;
		this.marginBottom = style?.marginBottom || 0;
		this.marginLeft = style?.marginLeft || 0;
		// this.padding = style?.padding || 0;
		this.paddingTop = style?.paddingTop || 0;
		this.paddingRight = style?.paddingRight || 0;
		this.paddingBottom = style?.paddingBottom || 0;
		this.paddingLeft = style?.paddingLeft || 0;

		// border
		// this.borderWidth = style?.borderWidth || 0;
		this.borderColor = style?.borderColor || 'black';
		this.borderStyle = style?.borderStyle || 'solid';
		this.borderTop = style?.borderTop || 0;
		this.borderRight = style?.borderRight || 0;
		this.borderBottom = style?.borderBottom || 0;
		this.borderLeft = style?.borderLeft || 0;
		// this.borderRadius = style?.borderRadius || 0;

		// Sizing/positioning
		this.textDecoration = style?.textDecoration || 'none';
		// this.textAlign = style?.textAlign || 'left';
	}
	border?: string | number;
	borderRadius?: string | number;
	borderWidth?: string | number;
	borderTopColor?: string;
	borderTopStyle?: BorderStyleValue;
	borderTopWidth?: string | number;
	borderRightColor?: string;
	borderRightStyle?: BorderStyleValue;
	borderRightWidth?: string | number;
	borderBottomColor?: string;
	borderBottomStyle?: BorderStyleValue;
	borderBottomWidth?: string | number;
	borderLeftColor?: string;
	borderLeftStyle?: BorderStyleValue;
	borderLeftWidth?: string | number;
	borderTopLeftRadius?: string | number;
	borderTopRightRadius?: string | number;
	borderBottomRightRadius?: string | number;
	borderBottomLeftRadius?: string | number;
	opacity?: string | number;
	height?: string | number;
	maxHeight?: string | number;
	maxWidth?: string | number;
	minHeight?: string | number;
	minWidth?: string | number;
	width?: string | number;
	flex?: string | number;
	alignContent?: AlignContent;
	alignItems?: AlignItems;
	alignSelf?: AlignSelf;
	flexDirection?: FlexDirection;
	flexWrap?: FlexWrap;
	flexFlow?: string | number;
	flexGrow?: string | number;
	flexShrink?: string | number;
	flexBasis?: string | number;
	justifySelf?: string;
	justifyContent?: JustifyContent;
	gap?: string | number;
	rowGap?: string | number;
	columnGap?: string | number;
	aspectRatio?: string | number;
	bottom?: string | number;
	display?: Display;
	left?: string | number;
	position?: Position;
	right?: string | number;
	top?: string | number;
	overflow?: 'hidden';
	zIndex?: string | number;
	margin?: string | number;
	marginHorizontal?: string | number;
	marginVertical?: string | number;
	padding?: string | number;
	paddingHorizontal?: string | number;
	paddingVertical?: string | number;
	objectPosition?: string | number;
	objectPositionX?: string | number;
	objectPositionY?: string | number;
	objectFit?: string;
	direction?: 'ltr' | 'rtl';
	letterSpacing?: string | number;
	lineHeight?: string | number;
	maxLines?: number;
	textDecorationColor?: string;
	textDecorationStyle?: string;
	textIndent?: any;
	textOverflow?: 'ellipsis';
	textTransform?: TextTransform;
	verticalAlign?: VerticalAlign;
	transformOrigin?: string | number;
	transformOriginX?: string | number;
	transformOriginY?: string | number;
	transform?: string | Transform[];
	gradientTransform?: string | Transform[];
	fill?: string;
	stroke?: string;
	strokeDasharray?: string;
	strokeWidth?: string | number;
	fillOpacity?: string | number;
	fillRule?: 'evenodd' | 'nonzero';
	strokeOpacity?: string | number;
	textAnchor?: 'end' | 'start' | 'middle';
	strokeLinecap?: 'round' | 'butt' | 'square';
	strokeLinejoin?: 'round' | 'butt' | 'square' | 'bevel' | 'miter';
	visibility?: 'hidden' | 'visible' | 'collapse';
	clipPath?: string;
	dominantBaseline?:
		| 'auto'
		| 'hanging'
		| 'mathematical'
		| 'central'
		| 'middle'
		| 'text-after-edge'
		| 'text-before-edge';
}
