import PageHeader from '@/components/common/PageHeader';
import styles from '@/styles/mypage/mypage.module.css';
import AccordionWrapper from '@/components/common/AccordionWrapper';
import Accordion from '@/components/common/Accordion';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import MyPost from '@/components/mypage/myPost/MyPost';
import MyProfile from '@/components/mypage/profile/MyProfile';
import MyOrder from '@/components/mypage/myOrder/MyOrder';
import CommunityNav from '@/components/common/CommunityNav';
import { Metadata } from 'next';

interface DetailPageProps {
	searchParams: {
		page?: string;
		sort: string;
		categories: string;
		num?: string;
	};
}

export async function generateMetadata(): Promise<Metadata> {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { data } = await supabase.auth.getUser();
	const userName = data?.user?.user_metadata.name;
	return {
		title: `${userName}님의 마이페이지 | Wooyeon.`,
		description: '마이페이지입니다.',
	};
}

export default async function page({ searchParams }: DetailPageProps) {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { data, error } = await supabase.auth.getUser();

	if (error) {
		throw error;
	}
	return (
		<div>
			<div>
				<PageHeader title="mypage" />
				<div className={styles.container}>
					<div className={styles.wrapper}>
						<h1 className={styles.userName}>
							{data.user.user_metadata.name}님,
						</h1>
						<h1 className={styles.userNameText}>안녕하세요!</h1>
					</div>
					<AccordionWrapper>
						<Accordion title={'내가쓴글'} index={0}>
							<CommunityNav />
							<MyPost
								userId={data.user.id}
								page={searchParams.page as string}
								sort={searchParams.sort as string}
								categories={searchParams.categories as string}
								num={searchParams.num as string}
							/>
						</Accordion>
						<Accordion title={'회원정보'} index={1}>
							<MyProfile userId={data.user.id} />
						</Accordion>
						<Accordion title={'주문내역'} index={2}>
							<MyOrder userId={data.user.id} />
						</Accordion>
					</AccordionWrapper>
				</div>
			</div>
		</div>
	);
}
