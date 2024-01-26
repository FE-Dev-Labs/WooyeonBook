import PageHeader from '@/components/common/PageHeader';
import styles from '@/styles/mypage/mypage.module.css';
import Accordionlayout from '@/components/common/Accordionlayout';
export default function page() {
	return (
		<div>
			<PageHeader title="mypage" />
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<h1 className={styles.userName}>박진양님, </h1>
					<h1 className={styles.userNameText}>안녕하세요!</h1>
					<Accordionlayout isMypage={true} />
				</div>
			</div>
		</div>
	);
}
