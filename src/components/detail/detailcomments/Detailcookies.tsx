// import styles from '@/styles/detail/detailcomments/detailcomment.module.css';
// import { createClient } from '@/utils/supabase/server';
// import { cookies } from 'next/headers';
// import Detailcomment from '@/components/detail/detailcomments/Detailcomment';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// const supabase = createClientComponentClient();

// export default async function Detailcookies() {
// 	const cookieStore = cookies();
// 	const supabase = createClient(cookieStore);

// 	// const { data, error } = await supabase.auth.getUser();

// 	const {
// 		data: { user },
// 	} = await supabase.auth.getUser();
// 	// const res = await fetch(`http://localhost:8080/auth`, { cache: 'no-cache' });
// 	// const user = await res.json();

// 	console.log(user);

// 	return (
// 		<div className={styles.commentContainer}>
// 			{/* <div>{data?.user?.email}</div> */}
// 			<Detailcomment />
// 		</div>
// 	);
// }
