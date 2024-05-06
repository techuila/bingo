import { ButtonHTMLAttributes } from 'react';
import cx from 'clsx';

import styles from './index.module.css';

type ButtonProps = {
	variant: 'primary' | 'secondary';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant, className, children, ...rest }: ButtonProps) {
	const variantStyles = styles[variant];

	return (
		<button
			{...rest}
			className={cx(styles.container, variantStyles, className)}
		>
			{children}
		</button>
	);
}
