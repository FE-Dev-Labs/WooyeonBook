import { AllDataType } from '@/types/community/view/data';

interface Props {
	page: string;
	searchParams: { sort?: string; q?: string; categories?: string };
}

export const getCommunityViewData = async ({ page, searchParams }: Props) => {
	const response = await fetch(`http://localhost:8080/community/${page}`, {
		cache: 'no-store',
	});

	const data: AllDataType[] = await response.json();

	const filterdData = searchParams?.q
		? data.filter((report: AllDataType) =>
				report.title.includes(searchParams.q as string),
			)
		: data;

	const sortedData = filterdData.sort((a: AllDataType, b: AllDataType) => {
		switch (searchParams?.sort) {
			case 'Latest':
				return b.created_at > a.created_at ? 1 : -1;
			case 'Oldest':
				return a.created_at > b.created_at ? 1 : -1;
			case 'View':
				return b.view - a.view;
			default:
				return 0;
		}
	});
	const filteringData = sortedData.filter((report: AllDataType) => {
		switch (searchParams?.categories) {
			case 'true':
				return report.state === false;
			case 'false':
				return report.state === true;
			default:
				return report;
		}
	});
	console.log(filteringData);

	return { data, filteringData };
};
