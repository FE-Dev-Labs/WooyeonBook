import { BasicLayoutType } from '@/types/layoutType';
import styles from '@/styles/community/detail/DetailLayout.module.css';
export default function detailLayout({ children }: BasicLayoutType) {
	return <div className={styles.container}>{children}</div>;
}
