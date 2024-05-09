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
};

module.exports = nextConfig;
