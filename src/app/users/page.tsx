export default async function confirm({
	searchParams,
}: {
	searchParams: { message: string };
}) {
	console.log(searchParams);

	return <>{searchParams?.message && <p>{searchParams.message}</p>}</>;
}
