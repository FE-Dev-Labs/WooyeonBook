import Link from 'next/link';

function Nav() {
	const communityUrl = (to: string) => {
		return `/community/${to}`;
	};
	return (
		<nav>
			<Link href={communityUrl('bookReport')}>독후감</Link>
			<Link href={communityUrl('bookReport')}>모임</Link>
			<Link href={communityUrl('bookReport')}>삽니다</Link>
			<Link href={communityUrl('bookReport')}>팝니다</Link>
		</nav>
	);
}

export default Nav;
