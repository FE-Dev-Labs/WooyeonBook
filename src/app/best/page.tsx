import PageHeader from '@/components/common/PageHeader';
import styles from '@/styles/best/best.module.css';
import BestView from '@/components/best/bestView/BestView';

export default function bestPage({
	searchParams,
}: {
	searchParams: { categoryId: string };
}) {
	// category id
	const categoryId = searchParams.categoryId;

	return (
		<div className={styles.container}>
			<PageHeader title="인기" />
			<BestView categoryId={categoryId} />
		</div>
	);
}
