import styles from './styles.module.scss';

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	const { className, ...restProps } = props;
	return <button type="button" className={`${className} ${styles.button}`} {...restProps} />;
}
