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
				<p>{newBookData.author}</p> {/* 저자/출판사 */}
				<p>{newBookData.priceSales}원 [10% 할인]</p>
			</div>
		</div>
	);
}
