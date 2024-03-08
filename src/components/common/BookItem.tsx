'use client';

import { useState } from 'react';
import styles from '@/styles/common/bookItem.module.css';
import Image from 'next/image';
import Link from 'next/link';
import addBook from '../../../public/common/addBook.png';
import deleteBook from '../../../public/common/deleteBook.png';
import { BestSellerType, NewBookType, UsedBookType } from '@/types/bookType';

interface BookItemProps {
	rank?: number;
	data: NewBookType | BestSellerType | UsedBookType;
}

export default function BookItem({ rank, data }: BookItemProps) {
	// + 버튼
	const [isAdded, setIsAdded] = useState<boolean>(false);

	// 할인율 계산 함수
	const calculateDiscountRate = (standardPrice: number, salesPrice: number) => {
		const discountAmount = standardPrice - salesPrice;
		const discountRate = (discountAmount / standardPrice) * 100;
		return Math.round(discountRate);
	};
	const discountRate = calculateDiscountRate(
		data?.priceStandard,
		data?.priceSales,
	);

	return (
		<div className={styles.bookItem}>
			<div className={styles.bookImage}>
				<Link
					href={`/detail/${data?.isbn}?type=${
						data?.mallType === 'USED' ? 'used' : 'new'
					}`}>
					<Image
						src={data?.cover}
						alt={data?.mallType === 'USED' ? 'used book' : 'new book'}
						width={200}
						height={275}
						priority={true}
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
				<Link
					href={`/detail/${data?.isbn}?type=${
						data?.mallType === 'USED' ? 'used' : 'new'
					}`}>
					<h1>{data?.title}</h1>
				</Link>
				<p>{`${data?.author?.replace(
					' (지은이)',
					'',
				)} / ${data?.publisher?.replace('(방송교재)', '')}`}</p>
				<p>
					<span style={{ textDecoration: 'line-through' }}>
						{`${data?.priceStandard?.toLocaleString()}원`}
					</span>
					{` ${data?.priceSales?.toLocaleString()}원`} [{discountRate}% 할인]
				</p>
			</div>
		</div>
	);
}
