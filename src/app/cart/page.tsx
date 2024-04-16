import PageHeader from '@/components/common/PageHeader';
import CartView from '@/components/cart/cartView/CartView';
import styles from '@/styles/cart/cart.module.css';

export default function cartPage() {
	return (
		<div className={styles.container}>
			<PageHeader title="장바구니" />
			<CartView />
		</div>
	);
}
