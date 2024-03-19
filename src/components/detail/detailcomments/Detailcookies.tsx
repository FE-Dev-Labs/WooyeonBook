import styles from '@/styles/detail/detailcomments/detailcomment.module.css';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Detailcomment from '@/components/detail/detailcomments/Detailcomment';

export default async function Detailcookies() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { data, error } = await supabase.auth.getUser();

	return (
		<div className={styles.commentContainer}>
			<div>{data?.user?.email}</div>
			<Detailcomment />
		</div>
	);
}
