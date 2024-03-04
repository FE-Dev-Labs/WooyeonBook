import Update from '@/components/community/update/Update';

const UpdatePage = async ({
	params,
}: {
	params: {
		docId: string;
	};
}) => {
	// 서버 컴포넌트로 데이터를 받고 props로 내려주는 컴포넌트로 만들면 좋을거 같음
	const data = await fetch(
		`http://localhost:8080/api/community/bookReport/${params.docId}`,
		{
			cache: 'force-cache',
		},
	);
	const json = await data.json();

	return (
		<div>
			<Update data={json[0]} docid={params.docId} />
		</div>
	);
};

export default UpdatePage;
