interface BestPageProps {
	categoryId: string | null;
	currentPage: number;
}

export const getBestAllBookData = async ({
	categoryId,
	currentPage,
}: BestPageProps) => {
	try {
		const response = await fetch(
			`http://localhost:8080/list/bestAll?categoryId=${categoryId}&page=${currentPage}`,
			{ cache: 'no-store' },
		);
		// 네트워크 응답 상태가 성공적이지 않은 경우
		if (!response.ok) {
			throw new Error(`Network response was not ok: ${response.statusText}`);
		}
		// return
		const { data, dataLength } = await response.json();
		return { data, dataLength };
		// 에러 처리
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
};
