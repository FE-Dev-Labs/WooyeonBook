'use client';

import { Book } from '@/types/bookDetailDate';
import Detaildescription from './detaildescription/Detaildescription';
import AccordionWrapper from '../common/AccordionWrapper';
import Accordion from '../common/Accordion';
import Detailexplanation from './detaildata/detailexplanation';
import Detailinformation from './detaildata/detailinformation';
import Detailsustainability from './detaildata/detailsustainability';
import Detailcomment from './detailcomments/Detailcomment';
import { useEffect } from 'react';
import { RecentlyViewedBookType } from '@/types/bookType';

interface DetailViewProps {
	book: Book;
	id: string;
}

export default function DetailView({ book, id }: DetailViewProps) {
	useEffect(() => {
		// 최근 본 상품 목록을 로컬 스토리지에서 가져오기
		const storedItems = localStorage.getItem('recentItems');
		let recentItems = storedItems ? JSON.parse(storedItems) : [];

		// 이미 리스트에 같은 아이템이 있는지 필터링, 있다면 제거
		recentItems = recentItems.filter(
			(item: RecentlyViewedBookType) => item.itemIsbn !== book.isbn,
		);

		// 현재 보고 있는 상품을 최근 본 상품 목록에 맨 앞에 추가
		recentItems.unshift({
			itemIsbn: book.isbn,
			itemCover: book.cover,
			itemMallType: book.mallType,
		});

		// 배열 내 아이템이 9개 이상일 경우, 오래된 항목 제거
		if (recentItems.length > 9) {
			// 최근 9개 항목만 유지
			recentItems = recentItems.slice(0, 9);
		}

		// 변경된 최근 본 상품 목록을 로컬 스토리지에 저장
		localStorage.setItem('recentItems', JSON.stringify(recentItems));
	}, [book, id]);

	return (
		<div>
			<Detaildescription bookInfo={book} />
			<AccordionWrapper>
				<Accordion title={'설명'} index={0}>
					<Detailexplanation bookInfo={book} />
				</Accordion>
				<Accordion title={'정보고시'} index={1}>
					<Detailinformation bookInfo={book} />
				</Accordion>
				<Accordion title={'지속가능성'} index={2}>
					<Detailsustainability bookInfo={book} />
				</Accordion>
				<Accordion title={'한줄평'} index={3}>
					{/* <Detailcookies /> */}
					<Detailcomment bookId={id} />
				</Accordion>
			</AccordionWrapper>
		</div>
	);
}
