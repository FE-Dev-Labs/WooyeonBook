import { BasicLayoutType } from '@/types/layoutType';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import '@/styles/global.css';
const inter = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: '',
	description: '',
};

export default function RootLayout({ children }: BasicLayoutType) {
	return (
		<html lang="kr">
			<body>{children}</body>
		</html>
	);
}
