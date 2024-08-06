import styles from './styles.module.scss';

export function CustomButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	const { className, ...restProps } = props;
	return <button type="button" className={`${className} ${styles.button}`} {...restProps} />;
}
