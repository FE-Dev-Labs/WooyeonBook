import Nav from '@/components/community/common/Nav';
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
			{children}
		</div>
	);
}
