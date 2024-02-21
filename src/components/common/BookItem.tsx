'use client';

import { useState } from 'react';
import styles from '@/styles/common/bookItem.module.css';
import Image from 'next/image';
import Link from 'next/link';
import addBook from '../../../public/common/addBook.png';
import deleteBook from '../../../public/common/deleteBook.png';
import { NewBookType } from '@/types/newBookType';
import { BestSellerType } from '@/types/bestSellerType';

interface BookItemProps {
	rank?: number;
	data: NewBookType | BestSellerType;
}

export default function BookItem({ rank, data }: BookItemProps) {
	const [isAdded, setIsAdded] = useState<boolean>(false);

	return (
		<div className={styles.bookItem}>
			{rank && <div className={styles.rank}>{rank}</div>}
			<div className={styles.bookImage}>
				{/* <Link
					href={{
						pathname: `/detail/${newBookData.itemId}`,
						query: { type: 'new' },
					}}> */}
				<Link href={`/detail/${data.isbn13}?type=new`}>
					<Image fill src={data.cover} alt="new book" />
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
				<Link href={`/detail/${data.isbn13}?type=new`}>
					<h1>{data.title}</h1>
				</Link>
				<p>{`${data.author.replace(' (지은이)', '')} / ${data.publisher.replace(
					'(방송교재)',
					'',
				)}`}</p>
				<p>
					<span style={{ textDecoration: 'line-through' }}>
						{`${data.priceStandard.toLocaleString()}원`}
					</span>
					{` ${data.priceSales.toLocaleString()}원`}
				</p>
			</div>
		</div>
	);
}
