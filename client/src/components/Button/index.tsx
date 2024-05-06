import { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { TailSpin } from 'react-loader-spinner';
import cx from 'clsx';

import styles from './index.module.css';

type ButtonProps = {
	variant: 'primary' | 'secondary';
	isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const spinner = {
	hiddden: {
		width: 0,
		marginRight: 0
	},
	visible: {
		width: 20,
		marginRight: 8
	}
};

export function Button({
	variant,
	className,
	isLoading,
	children,
	...rest
}: ButtonProps) {
	const variantStyles = styles[variant];

	return (
		<button
			{...rest}
			className={cx(styles.container, variantStyles, className)}
		>
			<motion.div
				initial='hiddden'
				animate={isLoading ? 'visible' : 'hidden'}
				variants={spinner}
			>
				<TailSpin
					visible={true}
					height='20'
					width='20'
					color='#000000'
					ariaLabel='tail-spin-loading'
					radius='1'
				/>
			</motion.div>
			{children}
		</button>
	);
}
