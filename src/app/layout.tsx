import { BasicLayoutType } from '@/types/layoutType';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import '@/styles/global.css';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/Footer';
import RecoilRootWrapper from '@/recoil/RecoilRootWrapper';
import QueryProvider from '@/recoil/QueryProvider';

const inter = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: '',
	description: '',
};

export default async function RootLayout({ children, auth }: BasicLayoutType) {
	return (
		<html lang="kr">
			<body className={inter.className} suppressHydrationWarning={true}>
				<QueryProvider>
					<RecoilRootWrapper>
						<Header />
						{children}
						{auth}
						<Footer />
					</RecoilRootWrapper>
				</QueryProvider>
			</body>
		</html>
	);
}
