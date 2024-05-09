import { InputHTMLAttributes } from 'react';
import cx from 'clsx';
import styles from './index.module.css';

type InputProps = {
	addOnAfter?: React.ReactNode;
	containerClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({
	addOnAfter,
	className,
	containerClassName,
	...rest
}: InputProps) {
	return (
		<div className={cx(styles.container, containerClassName)}>
			<input {...rest} className={cx(styles.input, className)} />
			{addOnAfter && <div className={styles.addOnAfter}>{addOnAfter}</div>}
		</div>
	);
}
