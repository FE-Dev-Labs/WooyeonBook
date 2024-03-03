const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors({ origin: true, credentials: true }));

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

app.get('/search/book', async (req, res) => {
	const { bookName } = req.query;
	try {
		const data = await axios.get(
			`http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttb0113byi1704001&SearchTarget=Book&output=js&Version=20131101&Query=${bookName}`,
		);
		res.status(200).send(data.data.item);
	} catch (err) {
		res.status(400).send(err);
	}
});

// 메인 페이지: 신간 도서(6개) api
app.get('/list/new', async (req, res) => {
	try {
		const response = await axios.get(
			`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbkjhhj991430001&QueryType=ItemNewSpecial&MaxResults=100&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`,
		);

		// 신간리스트의 item만 추출해 data에 할당
		const data = await response.data.item
			// 신간리스트 data 중 일부 카테고리 제외
			.filter(
				(item) =>
					!['어린이', '유아', '만화', '달력', '역사'].includes(
						item.categoryName.split('>')[1],
					),
			)
			// 앞에서 6개만 추출
			.slice(0, 6);

		res.status(200).send(data);
	} catch (err) {
		res.status(400).send(err);
	}
});

// 메인 페이지: 베스트셀러(5개) api
app.get('/list/best', async (req, res) => {
	try {
		const response = await axios.get(
			`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbkjhhj991430001&QueryType=Bestseller&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`,
		);

		// 베스트셀러의 item만 추출해 data에 할당
		const data = await response.data.item
			// 베스트셀러의 item을 rank순으로 소팅
			.sort((a, b) => a.bestRank - b.bestRank)
			// 앞에서 5개만 추출
			.slice(0, 5);

		res.status(200).send(data);
	} catch (err) {
		res.status(400).send(err);
	}
});

// 메인 페이지: 중고 도서(6개) api
app.get('/list/used', async (req, res) => {
	try {
		const response = await axios.get(
			`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbkjhhj991430001&QueryType=ItemNewAll&MaxResults=100&start=1&SearchTarget=Used&SubSearchTarget=Book&output=js&Version=20131101&Cover=Big`,
		);

		// 신간리스트의 item만 추출해 data에 할당
		const data = await response.data.item
			.filter(
				// 신간리스트 데이터 중 중고책 데이터만 추출
				(book) => book.mallType === 'USED',
			) // 앞에서 6개만 추출
			.slice(0, 6);

		res.status(200).send(data);
	} catch (err) {
		res.status(400).send(err);
	}
});

// new 페이지: 전체 신간 도서 api
app.get('/list/newAll', async (req, res) => {
	// request.query 내 categoryId 추출
	const { categoryId, page } = req.query;
	// 추출한 page를 숫자로 변환(문자열로 넘어옴)해서 startIndex에 삽입(아이템 뿌려주는 시작 숫자)
	const start = Number(page);

	try {
		const response = await axios.get(
			`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbkjhhj991430001&QueryType=ItemNewAll&MaxResults=30&start=${start}&SearchTarget=Book&CategoryId=${categoryId}&output=js&Version=20131101&Cover=Big`,
		);

		// 신간리스트의 해당 카테고리 item만 추출해 data에 할당
		const data = await response.data.item;
		// 해당 카테고리 item의 총 갯수
		const dataLength = await response.data.totalResults;

		res.status(200).send({ data, dataLength });
	} catch (err) {
		res.status(400).send(err);
	}
});

// best 페이지: 전체 베스트셀러 도서 api
app.get('/list/bestAll', async (req, res) => {
	// request.query 내 categoryId 추출
	const { categoryId, page } = req.query;
	// 추출한 page를 숫자로 변환(문자열로 넘어옴)해서 startIndex에 삽입(아이템 뿌려주는 시작 숫자)
	const start = Number(page);

	try {
		const response = await axios.get(
			`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbkjhhj991430001&QueryType=Bestseller&MaxResults=24&start=${start}&SearchTarget=Book&CategoryId=${categoryId}&output=js&Version=20131101&Cover=Big`,
		);

		// 신간리스트의 해당 카테고리 item만 추출해 data에 할당
		const data = await response.data.item;
		// 해당 카테고리 item의 총 갯수
		const dataLength = await response.data.totalResults;

		res.status(200).send({ data, dataLength });
	} catch (err) {
		res.status(400).send(err);
	}
});
