import styles from '@/styles/community/post/OptionBookMeeting.module.css';
import { BookMeetingDataType } from '@/types/community/post/data';
import dynamic from 'next/dynamic';

interface OptionBookMeetingProps {
	data?: BookMeetingDataType;
	chatUrl: {
		value: string;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	};
	deadline: {
		value: Date;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	};
	onchangeRecruitmentNumber: (e: any) => void;
}

const Select = dynamic(() => import('react-select'), {
	ssr: false,
	loading: () => (
		<div
			style={{
				width: '500px',
				height: '38px',
				backgroundColor: '#a5a5a5',
				borderRadius: '5px',
				marginRight: '50px',
			}}></div>
	),
});

const UpdateOptionBookMeeting = ({
	data,
	chatUrl,
	deadline,
	onchangeRecruitmentNumber,
}: OptionBookMeetingProps) => {
	const options = [
		{ value: '', label: '모집 인원을 선택해주세요.' },
		{ value: '1', label: '1명' },
		{ value: '2', label: '2명' },
		{ value: '3', label: '3명' },
		{ value: '4', label: '4명' },
		{ value: '5', label: '5명' },
		{ value: '6', label: '6명' },
		{ value: '7', label: '7명' },
		{ value: '8', label: '8명' },
		{ value: '9', label: '9명' },
		{ value: '10', label: '10명 이상' },
	];
	return (
		<div className={styles.meetingSelectContainer}>
			<div className={styles.meetingSelectWrap}>
				<label>연락 방법</label>
				<input
					type="text"
					placeholder="카카오 오픈채팅방 URL을 입력해주세요."
					value={chatUrl.value as string}
					onChange={chatUrl.onChange}
				/>
			</div>
			<div className={styles.meetingSelectWrap}>
				<label>모집 마감일</label>
				<input
					type="date"
					className={styles.dateInput}
					value={deadline.value.toString()}
					onChange={deadline.onChange}
				/>
			</div>
			<div className={styles.meetingSelectWrap}>
				<label>모집 인원</label>
				<Select
					className={styles.bookSelectBtn}
					options={options}
					defaultValue={{
						value: data?.recruitment_number,
						label: `${data?.recruitment_number}명`,
					}}
					onChange={onchangeRecruitmentNumber}
				/>
			</div>
		</div>
	);
};

export default UpdateOptionBookMeeting;
