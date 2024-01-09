import Link from 'next/link';
export default function Nav() {
	return (
		<nav>
			<Link href={'community/post/new?type=bookReport'}>독후감</Link>
			<Link href={'community/post/new?type=meeting'}>모임</Link>
			<Link href={'community/post/new?type=buyingBook'}>삽니다</Link>
			<Link href={'community/post/new?type=sellingBook'}>팝니다</Link>
		</nav>
	);
}
