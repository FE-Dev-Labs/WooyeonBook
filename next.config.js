/** @type {import('next').NextConfig} */
const nextConfig = {
	// <Image> 사용 시 어떤 출처의 외부 이미지든 사용
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
				port: '',
				pathname: '**',
			},
			{
				protocol: 'http',
				hostname: '**',
				port: '',
				pathname: '**',
			},
		],
	},

	// images: {
	// 	domains: ['image.aladin.co.kr'],
	// },

	// async rewrites() {
	// 	return [
	// 		{
	// 			source: '/apis/aladin/getNewBookData',
	// 			destination: `http://www.aladin.co.kr/ttb/api/ItemList.aspx??ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=ItemNewSpecial&MaxResults=30&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`,
	// 		},
	// 	];
	// },
};

module.exports = nextConfig;
