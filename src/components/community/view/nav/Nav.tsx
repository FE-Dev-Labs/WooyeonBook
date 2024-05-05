'use client';
import Link from 'next/link';
import styles from '@/styles/community/layoutNav.module.css';
import communityPathname from '@/apis/communityPathname';
import Image from 'next/image';
import pencilIcon from '@/assets/community/pencilIcon.png';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/recoil/atom/userAtom';
import { useRouter } from 'next/navigation';

function Nav() {
	const router = useRouter();
	const pathname = communityPathname();

	const isLogin = useRecoilValue(userAtom);

	const communityUrl = (to: string) => {
		return `/community/${to}`;
	};
	const postUrl = () => {
		if (isLogin.id === null) {
			return router.push('/login');
		}
		return `/community/post/new/${pathname}`;
	};
	const linkClassName = (path: string) => {
		return path == pathname ? styles.active : styles.linkItem;
	};

	return (
		<nav className={styles.container}>
			<div className={styles.linkWrap}>
				<Link
					className={linkClassName('bookReport')}
					href={communityUrl('bookReport')}>
					독후감
				</Link>
				<Link
					className={linkClassName('bookMeeting')}
					href={communityUrl('bookMeeting')}>
					모임
				</Link>
				<Link
					className={linkClassName('bookBuying')}
					href={communityUrl('bookBuying')}>
					삽니다
				</Link>
				<Link
					className={linkClassName('bookSelling')}
					href={communityUrl('bookSelling')}>
					팝니다
				</Link>
			</div>
			<button className={styles.writeBtn} onClick={postUrl}>
				<Image
					src={pencilIcon}
					alt="writeIcon"
					width={20}
					height={20}
					className={styles.writeIcon}
				/>
				글쓰기
			</button>
		</nav>
	);
}

export default Nav;
