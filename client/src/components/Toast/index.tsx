/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';
import { HTMLMotionProps, motion, useAnimation } from 'framer-motion';
import {
	CheckCircleFilled,
	CloseCircleFilled,
	ExclamationCircleFilled
} from '@ant-design/icons';
import { useToast } from './hooks/useToast';

import styles from './index.module.css';

type ToastProps = {
	message: string;
	variant: 'success' | 'error' | 'warning';
	duration?: number;
} & HTMLMotionProps<'div'>;

type ToastContextType = {
	isShow: boolean;
	duration: number;
	setShow: (_: boolean) => void;
	show: (_?: number) => void;
} | null;

const variants = {
	hidden: {
		opacity: 0,
		top: -50
	},
	visible: {
		opacity: 1,
		top: 40
	}
};

export const ToastContext = createContext<ToastContextType>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [show, setShow] = useState(false);
	const [duration, setDuration] = useState(3_000);

	const toastState = {
		isShow: show,
		duration,
		setShow,
		show(duration?: number) {
			setShow(true);
			if (duration) setDuration(duration);
		},
		isInit: true
	};
	return (
		<ToastContext.Provider value={toastState}>{children}</ToastContext.Provider>
	);
}

export function Toast({ message, variant, ...rest }: ToastProps) {
	const { isShow, setShow, duration } = useToast();
	const control = useAnimation();

	const Icon = () =>
		variant === 'success' ? (
			<CheckCircleFilled className={styles.success} />
		) : variant === 'error' ? (
			<CloseCircleFilled className={styles.error} />
		) : (
			<ExclamationCircleFilled className={styles.warning} />
		);

	useEffect(() => {
		if (isShow) {
			control.start('visible');
			const timer = setTimeout(() => {
				control.start('hidden').then(() => setShow(false));
			}, duration);
			return () => clearTimeout(timer);
		}
	}, [isShow]);

	return (
		isShow && (
			<motion.div
				initial='hidden'
				animate={control}
				variants={variants}
				transition={{ duration: 0.25, ease: 'easeIn' }}
				className={styles.container}
				{...rest}
			>
				{message}
				<Icon />
			</motion.div>
		)
	);
}
