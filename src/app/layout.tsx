import { BasicLayoutType } from '@/types/layoutType';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import '@/styles/global.css';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/Footer';
import RecoilRootWrapper from './recoilRootWrapper';

const inter = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: '',
	description: '',
};

export default function RootLayout({ children }: BasicLayoutType) {
	return (
		<html lang="kr">
			<body className={inter.className} suppressHydrationWarning={true}>
				<RecoilRootWrapper>
					<Header />
					{children}
					<Footer />
				</RecoilRootWrapper>
			</body>
		</html>
	);
}
