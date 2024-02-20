'use client';

import { useState } from 'react';
import styles from '@/styles/common/bookItem.module.css';
import Image from 'next/image';
import Link from 'next/link';
import addBook from '../../../public/common/addBook.png';
import deleteBook from '../../../public/common/deleteBook.png';

interface BookItemProp {
	rank?: number;
	newBookData: any;
}

export default function BookItem({ rank, newBookData }: BookItemProp) {
	console.log(newBookData);

	const [isAdded, setIsAdded] = useState<boolean>(false);

	return (
		<div className={styles.bookItem}>
			{rank && <div className={styles.rank}>{rank}</div>}
			<div className={styles.bookImage}>
				<Link href={newBookData.link}>
					<Image
						src={newBookData.cover}
						alt="new book"
						width={200}
						height={275}
						objectFit="cover"
					/>
				</Link>
			</div>
			<div
				className={styles.addDeleteBook}
				onClick={() => setIsAdded(!isAdded)}>
				<Image
					src={isAdded ? deleteBook : addBook}
					alt={isAdded ? 'Delete book' : 'Add book'}
					width={30}
					height={30}
				/>
			</div>
			<div className={styles.bookText}>
				<Link href={newBookData.link}>
					<h1>{newBookData.title}</h1>
				</Link>
				<p>{`${newBookData.author.replace(
					' (지은이)',
					'',
				)} / ${newBookData.publisher.replace('(방송교재)', '')}`}</p>
				<p>
					<span style={{ textDecoration: 'line-through' }}>
						{`${newBookData.priceStandard.toLocaleString()}원`}
					</span>
					{` ${newBookData.priceSales.toLocaleString()}원`}
				</p>
			</div>
		</div>
	);
}
