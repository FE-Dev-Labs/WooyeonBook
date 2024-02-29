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

// 메인 페이지 신간 도서
app.get('/api/new', async (req, res) => {
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

// 메인 페이지 베스트셀러
app.get('/api/best', async (req, res) => {
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

// 메인 페이지 중고 도서
app.get('/api/used', async (req, res) => {
	try {
		const response = await axios.get(
			`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbkjhhj991430001&QueryType=ItemNewAll&MaxResults=6&start=1&SearchTarget=Used&SubSearchTarget=Book&output=js&Version=20131101&Cover=Big`,
			{ cache: 'force-cache' },
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
