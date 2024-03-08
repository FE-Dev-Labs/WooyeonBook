import { Book } from '@/types/bookDetailDate';
import styles from '@/styles/layout/header/history/searchResult.module.css';
import Link from 'next/link';

interface searchResultProp {
	data: Book;
	keyword: string | number | Date;
}
export default function SearchResult({ data, keyword }: searchResultProp) {
	const titleParts = data.title.split(String(keyword));

	return (
		<>
			<ul className={styles.searchResultUl}>
				<li className={styles.searchResultLink}>
					<Link href={'/'} passHref legacyBehavior>
						<a className={styles.searchResultTitle}>
							{titleParts.map((word, index) => {
								return (
									<span key={index}>
										{index > 0 && (
											<strong className={styles.searchResultKeyword}>
												{String(keyword)}
											</strong>
										)}
										{word}
									</span>
								);
							})}
						</a>
					</Link>
				</li>
			</ul>
		</>
	);
}
