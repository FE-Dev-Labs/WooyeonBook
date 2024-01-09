'use client';
import type { BasicLayoutType } from '@/types/layoutType';
import Nav from '@/components/community/common/post/Nav';
import Title from '@/components/community/common/post/Title';

export default function PostLayout({ children }: BasicLayoutType) {
	return (
		<div>
			<Nav />
			<Title />
			{children}
		</div>
	);
}
