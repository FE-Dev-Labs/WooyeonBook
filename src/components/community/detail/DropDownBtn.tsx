'use client';
import Link from 'next/link';
import styles from '@/styles/community/detail/detailPage.module.css';
import { AllDataType } from '@/types/community/view/data';
import { useRef, useState } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import Image from 'next/image';
import moreIcon from '@/assets/detail/moreIcon.png';
import editIcon from '@/assets/detail/editIcon.png';
import deleteIcon from '@/assets/detail/deleteIcon.png';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
interface BookReportProps {
	data: AllDataType;
	user: User | null;
	page?: string;
}
interface User {
	id: string;
	name?: string;

	// 필요한 다른 속성들을 추가할 수 있습니다.
}
const DropDownBtn = ({ data, user, page }: BookReportProps) => {
	const [isOpen, setIsOpen] = useState(false); // 드롭다운 메뉴 상태관리
	// 외부 클릭 시
	const ref = useRef<HTMLInputElement>(null);
	const router = useRouter();
	// useOutsideClick 훅
	useOutsideClick({
		ref,
		handler: () => {
			setIsOpen(false);
		},
	});

	const deleteHandler = async () => {
		const supabase = createClient();

		await supabase
			.from(`${data.field}`)
			.delete()
			.eq('doc_id', data.doc_id)
			.select();

		router.push(`/community/${data.field}`);
	};

	return (
		<div className={styles.dropdown} ref={ref}>
			<button
				className={styles.moreIconHover}
				onClick={() => setIsOpen(!isOpen)}>
				<Image
					src={moreIcon}
					alt="moreIcon"
					width={18}
					height={3}
					className={styles.moreIcon}
				/>
			</button>
			{isOpen && (
				<div
					className={styles.dropdownMenu}
					style={{ display: isOpen ? 'block' : 'none' }}>
					{data?.created_user === user?.id ? (
						<div className={styles.dropdownMenuWrapper}>
							<div className={styles.dropdownIconHover}>
								<Link
									href={`/community/update/${page}/${data.doc_id}`}
									className={styles.editBtn}>
									<Image
										src={editIcon}
										alt="editIcon"
										width={16}
										height={16}
										className={styles.editIcon}
									/>
									수정
								</Link>
							</div>
							{/*삭제 로직 추가하기 */}
							<div className={styles.dropdownIconHover}>
								<button onClick={deleteHandler} className={styles.editBtn}>
									<Image
										src={deleteIcon}
										alt="deleteIcon"
										width={16}
										height={16}
										className={styles.editIcon}
									/>
									삭제
								</button>
							</div>
						</div>
					) : null}
				</div>
			)}
		</div>
	);
};

export default DropDownBtn;
