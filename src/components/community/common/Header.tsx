'use client';
import communityPathname from '@/apis/communityPathname';
import styles from '@/styles/community/Header.module.css';
function Header() {
	const pathname = communityPathname();
	const content = () => {
		switch (pathname) {
			case 'bookReport':
				return { title: '독후감', description: '글쓰기 실력을 늘려보세요' };
			case 'bookMeeting':
				return { title: '모임', description: '책을 읽고 나누는 모임' };
			case 'bookBuying':
				return { title: '삽니다', description: '책을 구매하고 싶을 때' };
			case 'bookSelling':
				return { title: '팝니다', description: '책을 판매하고 싶을 때' };
		}
	};

	return (
		<header className={styles.Container}>
			<div>
				<h2>{content()?.title}</h2>
				<p>{content()?.description}</p>
			</div>
		</header>
	);
}

export default Header;
