export default async function confirmSingUp({
	searchParams,
}: {
	searchParams: { message: string };
}) {
	console.log(searchParams);

	return <>{searchParams?.message && <p>{searchParams.message}</p>}</>;
}
