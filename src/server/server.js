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
			`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbkjhhj991430001&QueryType=ItemNewSpecial&MaxResults=6&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`,
		);

		// 신간리스트의 item만 추출해 data에 할당
		const data = await response.data.item;

		res.status(200).send(data);
	} catch (err) {
		res.status(400).send(err);
	}
});

// 메인 페이지: 베스트셀러(5개) api
app.get('/list/best', async (req, res) => {
	try {
		const response = await axios.get(
			`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbkjhhj991430001&QueryType=Bestseller&MaxResults=5&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`,
		);

		// 베스트셀러의 item을 rank순으로 소팅해 data에 할당
		const data = await response.data.item.sort(
			(a, b) => a.bestRank - b.bestRank,
		);
		// .slice(0, -1);

		res.status(200).send(data);
	} catch (err) {
		res.status(400).send(err);
	}
});

// 메인 페이지: 중고 도서(6개) api
app.get('/list/used', async (req, res) => {
	try {
		const response = await axios.get(
			`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbkjhhj991430001&QueryType=ItemNewAll&MaxResults=6&start=1&SearchTarget=Used&SubSearchTarget=Book&output=js&Version=20131101&Cover=Big`,
		);

		// 신간리스트의 item의 중고책 데이터만 추출해 data 할당
		const data = await response.data.item.filter(
			(book) => book.mallType === 'USED',
		);

		res.status(200).send(data);
	} catch (err) {
		res.status(400).send(err);
	}
});

// new 페이지: 전체 신간 도서 api
app.get('/list/newAll', async (req, res) => {
	// request.query 내 categoryId 추출
	const { categoryId } = req.query;

	try {
		const response = await axios.get(
			`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbkjhhj991430001&QueryType=ItemNewSpecial&MaxResults=30&start=1&SearchTarget=Book&CategoryId=${categoryId}&output=js&Version=20131101&Cover=Big`,
		);

		// 신간리스트의 해당 카테고리 item만 추출해 data에 할당
		const data = await response.data.item;

		res.status(200).send(data);
	} catch (err) {
		res.status(400).send(err);
	}
});

// new 페이지 전체 신간 도서
// app.get('/api/newAll/:category?', async (req, res) => {
// 	const category = req.params.category;

// 	try {
// 		const response = await axios.get(
// 			`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbkjhhj991430001&QueryType=ItemNewAll&MaxResults=30&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`,
// 			{ cache: 'force-cache' },
// 		);

// 		// 신간리스트의 item만 추출해 data에 할당
// 		let data = response.data.item;

// 		// 카테고리가 지정되었으며, 그 카테고리가 '전체'가 아닌 경우에만 해당 카테고리에 맞는 아이템으로 필터링
// 		if (category && category !== '전체') {
// 			data = data.filter((item) => {
// 				const itemCategory = item.categoryName.split('>')[1];
// 				return itemCategory === category;
// 			});
// 		}

// 		res.status(200).send(data);
// 	} catch (err) {
// 		res.status(400).send(err);
// 	}
// });
