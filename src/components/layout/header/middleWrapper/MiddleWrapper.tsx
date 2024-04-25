import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logoIcon from '@/assets/layout/locoIcon.png';
import styles from '@/styles/layout/header/middleWrapper/middleWrapper.module.css';

export default function MiddleWrapper() {
	return (
		<div className={styles.middleWrapper}>
			<Link href="/">
				<Image src={logoIcon} alt="logo" width={160} height={30} />
			</Link>
		</div>
	);
}
