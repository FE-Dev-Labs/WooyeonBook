'use client';

import { Book } from '@/types/bookDetailDate';
import Accordion from '../common/Accordion';
import AccordionWrapper from '../common/AccordionWrapper';
import Detailcomment from './detailcomments/Detailcomment';
import Detailexplanation from './detaildata/detailexplanation';
import Detailinformation from './detaildata/detailinformation';
import Detailsustainability from './detaildata/detailsustainability';
import Detaildescription from './detaildescription/Detaildescription';

interface DetailViewProps {
	book: Book;
	id: string;
}

export default function DetailView({ book, id }: DetailViewProps) {
	return (
		<>
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
		</>
	);
}
