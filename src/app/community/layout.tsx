import ControlPanel from '@/components/community/common/ControlPanel';
import Nav from '@/components/community/common/Nav';
import Search from '@/components/community/common/Search';
import { BasicLayoutType } from '@/types/layoutType';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: '',
	description: '',
};

export default function RootLayout({ children }: BasicLayoutType) {
	return (
		<div>
			<div>
				<Nav />
				<Search />
				<ControlPanel />
				<hr />
				{children}
			</div>
			<Link href={''}>
				<h3>인기글</h3>
				<div>
					<div>내용</div>
					<div>
						<div>작성자</div>
						<div>작성일</div>
					</div>
				</div>
			</Link>
		</div>
	);
}
