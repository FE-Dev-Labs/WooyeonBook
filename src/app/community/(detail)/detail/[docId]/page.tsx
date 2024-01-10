import Link from 'next/link';

export default function page() {
	return (
		<div>
			<div>title</div>
			<div>
				<div>
					<div>작성일</div>
					<div>조회수</div>
					<div>댓글</div>
				</div>
				<div>
					<Link href={`community/edit?type=${`###`}/${`docId`}}`}>수정</Link>
					<button>삭제</button>
				</div>
			</div>
			<hr />
			<div>view</div>
			<hr />
			<div>
				<div>답변 ##</div>
				<div>
					<div>좋아요</div>
					<div>최신순</div>
				</div>
			</div>
			<div>
				<button>댓글 작성하기</button>
			</div>
			<div>댓글</div>
		</div>
	);
}
