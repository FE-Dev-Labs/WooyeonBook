import styles from '@/styles/category/categoryBar/categoryBar.module.css';
import Link from 'next/link';

export default function CategoryBar() {
	const categoryItems = [
		{ name: '전체', link: '' },
		{ name: '소설', link: '' },
		{ name: '에세이·시', link: '' },
		{ name: '경제·경영', link: '' },
		{ name: '자기개발', link: '' },
		{ name: '인문', link: '' },
		{ name: '사회·정치', link: '' },
		{ name: '역사', link: '' },
		{ name: '종교', link: '' },
		{ name: '예술·대중문화', link: '' },
		{ name: '자연과학', link: '' },
		{ name: '가정·살림', link: '' },
		{ name: '건강·취미·여행', link: '' },
		{ name: '어린이·유아', link: '' },
		{ name: '청소년', link: '' },
		{ name: '국어·외국어', link: '' },
		{ name: 'IT·모바일', link: '' },
		{ name: '대학교재', link: '' },
		{ name: '수험서·자격증', link: '' },
		{ name: '잡지', link: '' },
		{ name: '만화', link: '' },
		{ name: '로맨스', link: '' },
		{ name: '판타지/무협', link: '' },
	];

	return (
		<div>
			<div className={styles.categoryBarWrapper}>
				<header className={styles.categoryBarTitle}>
					<h1>분야</h1>
				</header>
				<ol className={styles.categoryBarItems}>
					{categoryItems.map((item, index) => (
						<li key={index}>
							<Link href={item.link}>
								<p>{item.name}</p>
							</Link>
						</li>
					))}
				</ol>
			</div>
		</div>
	);
}
