interface Props {
	id: string;
}

export function Button({ id }: Props) {
	return <button type="button" id={id} />;
}
