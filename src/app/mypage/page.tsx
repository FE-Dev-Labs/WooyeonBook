import PageHeader from '@/components/common/PageHeader';
import styles from '@/styles/mypage/mypage.module.css';
import AccordionWrapper from '@/components/common/AccordionWrapper';
import Accordion from '@/components/common/Accordion';
import Communitynav from '@/components/common/Communitynav';
import Postaccordionlayout from '@/components/common/Postaccordionlayout';
import { testdatalist } from '@/apis/testdatalist';
import Myprofile from '@/components/mypage/profile/Myprofile';
import Myorder from '@/components/mypage/myorder/Myorder';
export default function page() {
	return (
		<div>
			<PageHeader title="mypage" />
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<h1 className={styles.userName}>박진양님, </h1>
					<h1 className={styles.userNameText}>안녕하세요!</h1>
				</div>
				<AccordionWrapper>
					<Accordion title={'내가쓴글'} index={0}>
						<Communitynav />
						{testdatalist.map((list) => {
							return (
								<div className={styles.postAccordionContainer}>
									<div className={styles.postAccordionWrapper}>
										<Postaccordionlayout list={list} />
									</div>
								</div>
							);
						})}
					</Accordion>
					<Accordion title={'회원정보'} index={1}>
						<Myprofile />
					</Accordion>
					<Accordion title={'주문내역'} index={2}>
						<Myorder />
					</Accordion>
				</AccordionWrapper>
			</div>
		</div>
	);
}
