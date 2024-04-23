'use client';
import styles from '@/styles/layout/header/bottomWrapper/search/recentSearch/hotWord.module.css';
import Image from 'next/image';
import lineIcon from '../../../../../../../public/layout/line.png';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { sortTypeAtom } from '@/recoil/atom/sortTypeAtom';
import { CurrentPageAtom } from '@/recoil/atom/CurrentPageAtom';
interface popularKeywords {
	id: string;
	keyword: string | number | Date;
	search_count: string;
	created_at: Date;
}
export default function HotWord() {
	// useRouter 호출
	const router = useRouter();

	// 원준 추가
	// sort type setValue
	const setSortType = useSetRecoilState(sortTypeAtom);
	// current page setValue
	const setCurrentPage = useSetRecoilState(CurrentPageAtom);

	const [popularSearchData, setPopularSearchData] = useState<popularKeywords[]>(
		[],
	);

	// 검색어 api
	useEffect(() => {
		const fetchKeywords = async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search/supabase/keywords`,
				{
					cache: 'force-cache',
				},
			);
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

	// 인기 검색어 클릭 시 동작하는 함수
	const handleValueClick = (value: string) => {
		router.push(`/search?keyword=${value}&sortType=title`);
		// 1페이지로&제목순으로 초기화
		setCurrentPage(1);
		setSortType('title');
	};
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
								<span
									className={styles.hotWordLink}
									onMouseDown={() => {
										handleValueClick(hotword.keyword as string);
									}}>
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
								</span>
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
