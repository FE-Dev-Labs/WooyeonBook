'use client';
import Link from 'next/link';
import styles from '@/styles/layout/header/history/hotWord.module.css';
import Image from 'next/image';
import lineIcon from '../../../../../public/layout/line.png';
import { useEffect, useState } from 'react';
interface popularKeywords {
	id: string;
	keyword: string | number | Date;
	search_count: string;
	created_at: Date;
}
export default function HotWord() {
	const [popularSearchData, setPopularSearchData] = useState<popularKeywords[]>(
		[],
	);

	// 검색어 api
	useEffect(() => {
		const fetchKeywords = async () => {
			const response = await fetch(`http://localhost:8080/api/getKeywords`, {
				cache: 'force-cache',
			});
			const data: popularKeywords[] = await response.json();
			setPopularSearchData(data);
		};
		fetchKeywords();
	}, []);

	// 현재 년도 날짜 함수
	const today = new Date();

	let year = today.getFullYear();
	let month = ('0' + (today.getMonth() + 1)).slice(-2);
	let day = ('0' + today.getDate()).slice(-2);

	const dateString = year + '-' + month + '-' + day;

	return (
		<dl className={styles.hotWordWrapper}>
			<dt className={styles.hotWordTxt}>
				인기 검색어
				<span className={styles.hotWordDate}>{dateString}</span>
			</dt>
			<dd>
				<ol className={styles.hotWordPopularWrap}>
					{popularSearchData?.map((hotword, index) => {
						return (
							<li className={styles.hotWordPopularLi} key={index}>
								<Link href={'/'} passHref legacyBehavior>
									<a className={styles.hotWordLink}>
										<span className={styles.hotWordNum}>{index + 1}</span>
										<span className={styles.hotWordTitle}>
											{hotword.keyword as string}
										</span>
										<Image
											src={lineIcon}
											alt="lineIcon"
											className={styles.lineIcon}
											width={15}
											height={2}
										/>
									</a>
								</Link>
							</li>
						);
					})}
					{/* <li className={styles.hotWordPopularLi}>
						<Link href={'/'} passHref legacyBehavior>
							<a className={styles.hotWordLink}>
								<span className={styles.hotWordNum}>2</span>
								<span className={styles.hotWordTitle}>쇼펜하우어</span>
								<Image
									src={lineIcon}
									alt="lineIcon"
									className={styles.lineIcon}
									width={15}
									height={2}
								/>
							</a>
						</Link>
					</li>
					<li className={styles.hotWordPopularLi}>
						<Link href={'/'} passHref legacyBehavior>
							<a className={styles.hotWordLink}>
								<span className={styles.hotWordNum}>3</span>
								<span className={styles.hotWordTitle}>영어</span>
								<Image
									src={lineIcon}
									alt="lineIcon"
									className={styles.lineIcon}
									width={15}
									height={2}
								/>
							</a>
						</Link>
					</li>
					<li className={styles.hotWordPopularLi}>
						<Link href={'/'} passHref legacyBehavior>
							<a className={styles.hotWordLink}>
								<span className={styles.hotWordNum}>4</span>
								<span className={styles.hotWordTitle}>자기계발</span>
								<Image
									src={lineIcon}
									alt="lineIcon"
									className={styles.lineIcon}
									width={15}
									height={2}
								/>
							</a>
						</Link>
					</li> */}
				</ol>
			</dd>
		</dl>
	);
}
