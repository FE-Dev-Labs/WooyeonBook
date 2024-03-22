interface NewPaginationProp {
	pageLength: number;
}

export default function NewPagintion({ pageLength }: NewPaginationProp) {
	return <div>{pageLength}</div>;
}
