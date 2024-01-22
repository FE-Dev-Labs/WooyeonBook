import styles from '@/styles/category/CategoryBookItemWrapper/sortBar.module.css';

export default function SortBar() {
	return (
		<div className={styles.sortBox}>
			<div className={styles.textBox}>
				<p>인기순</p>
				<p>최신순</p>
				<p>제목순</p>
				<p>출간일순</p>
			</div>
		</div>
	);
}
