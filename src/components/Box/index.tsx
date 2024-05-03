import { motion, HTMLMotionProps, useAnimation } from 'framer-motion';
import { isMobile } from 'react-device-detect';

import styles from './index.module.css';
import { useEffect, useState } from 'react';

enum Colors {
	ACTIVE = '#00D403',
	INACTIVE = '#2f4552',
	HOVER = '#486172'
}

const mobileOnTap = {
	transform: ['translateY(0)', 'translateY(-6px)', 'translateY(0)'],
	transition: {
		duration: 0.5
	}
};

const variants = {
	active: {
		backgroundColor: Colors.ACTIVE
	},
	inactive: {
		backgroundColor: Colors.INACTIVE
	}
};

const container = {
	hidden: {
		opacity: 0,
		transform: 'translateY(0)'
	},
	visible: {
		transform: ['translateY(0)', 'translateY(-6px)', 'translateY(0)'],
		opacity: 1
	},
	active: { opacity: 1, ...mobileOnTap }
};

const hover = {
	cursor: 'pointer',
	transform: 'translateY(-6px)'
};

const transition = {
	duration: 0.25
};

type BoxProps = {
	isMouseDown: boolean;
	isHovered: boolean;
} & HTMLMotionProps<'div'>;

export function Box({ isMouseDown, isHovered, ...rest }: BoxProps) {
	const [isActive, setIsActive] = useState(false);
	const isDragging = isMouseDown && isHovered;
	const controls = useAnimation();

	const toggleActiveIfMouseDownOrDragging = () => {
		if (isMouseDown || isDragging) {
			setIsActive((prevState) => !prevState);
		}
	};

	useEffect(() => {
		controls.start('visible');
	}, []);

	return (
		<motion.div
			{...rest}
			whileHover={hover}
			className={styles.boxContainer}
			transition={transition}
			initial='hidden'
			animate={controls}
			variants={container}
			onClick={() => isMobile && controls.start('active')}
		>
			<motion.div
				className={styles.box}
				whileHover={{
					backgroundColor: isActive ? Colors.ACTIVE : Colors.HOVER
				}}
				animate={isActive ? 'active' : 'inactive'}
				onMouseUp={toggleActiveIfMouseDownOrDragging}
				onMouseLeave={toggleActiveIfMouseDownOrDragging}
				variants={variants}
				transition={transition}
			></motion.div>
		</motion.div>
	);
}
