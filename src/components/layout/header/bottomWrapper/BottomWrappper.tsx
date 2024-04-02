import React from 'react';
import Nav from './nav/Nav';
import Search from './search/Search';
import Account from './Account';
import styles from '@/styles/layout/header/bottomWrapper/bottomWrapper.module.css';

export default function BottomWrappper() {
	return (
		<div className={styles.bottomWrapper}>
			<Nav />
			<Search />
			{/* <Account /> */}
		</div>
	);
}
