import { AllDataType } from '@/types/community/view/data';

const fetchCommunity = async () => {};

const fetchDetailCommunity = async (page: string, doc_id: string) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/detail/${page}/${doc_id}`,
		{
			cache: 'no-store',
		},
	);
	const data: AllDataType = await response.json();
	return data;
};

const updateCommunity = async () => {};

const deleteCommunity = async () => {};

export {
	fetchCommunity,
	fetchDetailCommunity,
	updateCommunity,
	deleteCommunity,
};
