import ControlPanel from '@/components/community/common/ControlPanel';
import Nav from '@/components/community/common/Nav';
import Search from '@/components/community/common/Search';
import { BasicLayoutType } from '@/types/layoutType';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: '',
	description: '',
};

export default function RootLayout({ children }: BasicLayoutType) {
	return (
		<div>
			<Nav />
			<Search />
			<ControlPanel />
			<hr />
			{children}
		</div>
	);
}
