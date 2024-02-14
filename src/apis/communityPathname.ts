import { usePathname } from 'next/navigation';

const communityPathname = () => {
	const pathname = usePathname().split('/')[2];
	return pathname;
};

export default communityPathname;
