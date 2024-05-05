import CartView from '@/components/cart/cartView/cartView';
import PageHeader from '@/components/common/PageHeader';
import styles from '@/styles/cart/cart.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: '장바구니 | Wooyeon.',
	description: '장바구니 페이지입니다.',
};

export default function cartPage() {
	return (
		<div className={styles.container}>
			<PageHeader title="장바구니" />
			<CartView />
		</div>
	);
}
