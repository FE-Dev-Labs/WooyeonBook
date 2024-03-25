'use client';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

const NaviLab = ({
	page,
	doc_id,
	view,
	children,
}: {
	page: string;
	doc_id: string;
	view: number;
	children: React.ReactNode;
}) => {
	const supabase = createClient();
	const viewCount = async () => {
		const { error } = await supabase
			.from(page as string)
			.update({
				view: (view as number) + 1,
			})
			.eq('doc_id', doc_id)
			.select();

		if (error) {
			throw new Error('Error updating view count');
		}
	};

	return (
		<Link href={`/community/detail/${page}/${doc_id}`} onClick={viewCount}>
			{children}
		</Link>
	);
};

export default NaviLab;
