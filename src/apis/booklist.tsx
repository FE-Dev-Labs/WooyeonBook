export async function getBookList() {
	const TTB = process.env.NEXT_PUBLIC_API_KEY;
	const res = await fetch(
		`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${TTB}&QueryType=ItemNewAll&SearchTarget=Book&Version=20131101&output=js`,
	);
	if (!res.ok) {
		throw new Error('Failed to fetxh data');
	}
	const data = await res.json();
	console.log(data);
	return data;
}
