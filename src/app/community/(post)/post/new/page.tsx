'use client';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
// dynamic import loading skeleton ui
export default function page() {
	const Select = dynamic(() => import('react-select'), {
		ssr: false,
		loading: () => <p>로딩중...</p>,
	});
	const Editor = dynamic(
		() => import('@/components/community/common/post/WysiwygEditor'),
		{
			ssr: false,
			loading: () => <p>로딩중...</p>,
		},
	);
	const pathname = usePathname().split('/')[2];

	return (
		<div>
			<div>
				<Select />
				{pathname === 'bookReport' ? null : <Select />}
			</div>
			<div>
				<Editor />
			</div>
			<div>
				<button>취소</button>
				<button>등록</button>
			</div>
		</div>
	);
}
