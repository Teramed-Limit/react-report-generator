export interface FieldAttributeComponentProps<T> {
	attrPath: (number | string)[];
	attribute: T;
	onSetAttribute: (attrPath: (number | string)[], attrValue: number | string | boolean) => void;
}
