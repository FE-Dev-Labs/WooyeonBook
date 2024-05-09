import { AllDataType } from '@/types/community/view/data';

interface Props {
	page: string;
	searchParams: {
		sort?: string;
		q?: string;
		categories?: string;
		num?: number;
	};
}

export const getCommunityViewData = async ({ page, searchParams }: Props) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/view/${page}?num=${searchParams.num || 1}`,
		{
			cache: 'no-store',
		},
	);

	const data: AllDataType[] = await response.json();

	const filterdData = searchParams?.q
		? data.filter((report: AllDataType) =>
				report.title.includes(searchParams.q as string),
			)
		: data;

	const filteringData = filterdData.filter((report: AllDataType) => {
		if (page === 'bookSelling') {
			switch (searchParams?.categories) {
				case 'true':
					return report.selling === true;
				case 'false':
					return report.selling === false;
				default:
					return report;
			}
		} else {
			switch (searchParams?.categories) {
				case 'true':
					return report.state === false;
				case 'false':
					return report.state === true;
				default:
					return report;
			}
		}
	});
	const sortedData = filteringData.sort((a: AllDataType, b: AllDataType) => {
		switch (searchParams?.sort) {
			case 'Latest':
				return b.created_at > a.created_at ? 1 : -1;
			case 'Oldest':
				return a.created_at > b.created_at ? 1 : -1;
			case 'View':
				return b.view - a.view;
			default:
				return b.created_at > a.created_at ? 1 : -1;
		}
	});

	return { sortedData };
};
