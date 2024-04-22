// const bookListRouter = require('./bookList');
// app.use(bookListRouter);
// app.use('./bookList', bookListRouter);

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const { createClient } = require('@supabase/supabase-js');
const { serialize } = require('v8');

const app = express();
const port = 8080;
require('dotenv').config();

app.use(cors({ origin: true, credentials: true }));
// body를 읽는게 있어야된다

app.use(express.json({ extended: true }));
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_ANON_KEY,
);

// 책 검색 api
app.get('/search/book', async (req, res) => {
	const { bookName } = req.query;
	try {
		const data = await axios.get(
			`http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbkjhhj991430001&SearchTarget=Book&output=js&Version=20131101&Query=${bookName}`,
		);
		res.status(200).send(data.data.item);
	} catch (err) {
		res.status(400).send(err);
	}
});

// 키워드 api
app.get('/search/keyword', async (req, res) => {
	const { keyword } = req.query;

	try {
		const data = await axios.get(
			`http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${process.env.TTB_KEY}&Query=${keyword}&SearchTarget=All&output=js&Version=20131101`,
		);
		res.status(200).send(data.data.item);
	} catch (err) {
		res.status(400).send(err);
	}
});

// 검색어가 supbase에 있는지 확인하는 api
app.get('/supbase/popularSearch', async (req, res) => {
	const { keyword } = req.query;
	try {
		const { data, error } = await supabase
			.from('PopularSearch')
			.select('*')
			.eq('keyword', keyword);
		if (error) throw error;
		return res.status(200).send(data);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

// 키워드 추가 api
app.put('/api/updateKeywords', async (req, res) => {
	const { keyword } = req.query;
	let { count } = req.query;

	// count 값을 숫자로 변환
	count = Number(count);
	try {
		// 기존 검색어의 횟수 업데이트
		const { data, error } = await supabase
			.from('PopularSearch')
			.update({ search_count: count + 1 })
			.eq('keyword', keyword)
			.select();
		if (error) throw error;
		return res.status(200).send(data);
	} catch (error) {
		res.status(400).send(error);
	}
});

// 새 검색어 api
app.post('/api/saveKeywords', async (req, res) => {
	try {
		const { data, error } = await supabase
			.from('PopularSearch')
			.insert(req.body)
			.select();
		if (error) throw error;
		res.status(200).send(data);
	} catch (error) {
		res.status(400).send(error);
	}
});

// 검색어 가져오기 api
app.get(`/api/getKeywords`, async (req, res) => {
	try {
		let { data, error } = await supabase
			.from('PopularSearch')
			// select('*') 하면 안됨
			// db에서 몇개 가져올지 정함
			.select()
			.range(0, 8)
			// 숫자가 높은 순으로 가져옴
			.order('search_count', { ascending: false })
			// 최신 순으로 가져옴
			.order('created_at', { ascending: false });
		if (error) {
			throw error;
		}
		res.status(200).send(data);
	} catch (error) {
		res.status(400).send(error);
	}
});

app.get('/auth', async (req, res) => {
	try {
		const { data, error } = await supabase.auth.getUser();
		res.status(200).send(data);
	} catch (error) {
		res.status(400).send;
	}
});

// 마이페이지 내가 쓴글
// const getReportData = async () => {
// 	const { data, error } = await supabase
// 		.from('bookReport')
// 		.select('*')
// 		.eq('created_user', userId);
// };
// const getMeetingData=()=>{}
// const getBuyingData=()=>{}
// const getSellingData=()=>{}
app.get('/mylike', async (req, res) => {
	const { user_id } = req.query;
	try {
		const { data: bookReport } = await supabase.from('bookReport').select();
		const bookReportData = bookReport.filter((item) =>
			item.like_users.includes(user_id),
		);
		const { data: bookMeeting } = await supabase.from('bookMeeting').select();
		const bookMeetingData = bookMeeting.filter((item) =>
			item.like_users.includes(user_id),
		);
		const { data: bookSelling } = await supabase.from('bookSelling').select();
		const bookSellingData = bookSelling.filter((item) =>
			item.like_users.includes(user_id),
		);
		const { data: bookBuying } = await supabase.from('bookBuying').select();
		const bookBuyingData = bookBuying.filter((item) =>
			item.like_users.includes(user_id),
		);

		const data = [
			...bookReportData,
			...bookMeetingData,
			...bookSellingData,
			...bookBuyingData,
		];
		res.status(200).send(data);
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

app.get('/api/mypage', async (req, res) => {
	const { page, userId } = req.query;
	try {
		const { data, error } = await supabase
			.from(`${page}`)
			.select('*')
			.eq('created_user', userId);
		if (error) {
			throw error;
		}
		res.status(200).send(data);
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

// 커뮤니티 update api
app.get('/api/community/bookReport/:docid', async (req, res) => {
	try {
		const { data, error } = await supabase
			.from('bookReport')
			.select('*')
			.eq('doc_id', req.params.docid);
		if (error) {
			throw error;
		}
		res.status(200).send(data[0]);
	} catch (err) {
		res.status(400).send;
	}
});

app.get('/api/community/bookMeeting/:docid', async (req, res) => {
	try {
		const { data, error } = await supabase
			.from('bookMeeting')
			.select('*')
			.eq('doc_id', req.params.docid);
		if (error) {
			throw error;
		}
		res.status(200).send(data[0]);
	} catch (err) {
		res.status(400).send;
	}
});

app.get('/api/community/bookBuying/:docid', async (req, res) => {
	try {
		const { data, error } = await supabase
			.from('bookBuying')
			.select('*')
			.eq('doc_id', req.params.docid);
		if (error) {
			throw error;
		}
		res.status(200).send(data[0]);
	} catch (err) {
		res.status(400).send;
	}
});

app.get('/api/community/bookSelling/:docid', async (req, res) => {
	try {
		const { data, error } = await supabase
			.from('bookSelling')
			.select('*')
			.eq('doc_id', req.params.docid);
		if (error) {
			throw error;
		}
		res.status(200).send(data[0]);
	} catch (err) {
		res.status(400).send;
	}
});

/** 원준 api */
// category 페이지 : 신간 전체 리스트 api
app.get('/list/newAll', async (req, res) => {
	const { categoryId, sortType } = req.query;
	try {
		// 첫번째 api
		const response = await axios.get(
			`${process.env.BASE_URL}?ttbkey=${process.env.TTB_KEY}&QueryType=ItemNewAll&MaxResults=24&start=1&SearchTarget=Book&CategoryId=${categoryId}&output=js&Version=20131101&Cover=Big`,
		);
		// 데이터의 item 속성만 추출
		const data = await response.data.item;
		// 해당 카테고리의 모든 데이터를 넣어줄 배열 (+ 첫 요청에서 가져온 24개 아이템)
		const allCategoryData = [...data];
		// 해당 카테고리의 모든 아이템 개수
		const allCategoryDataLength = await response.data.totalResults;
		// 해당 카테고리의 데이터 요청 수(한 번에 최대 50)
		const pageLength = Math.ceil(allCategoryDataLength / 50);

		// 두 번째 요청부터 마지막 요청까지 데이터 누적
		for (let start = 2; start <= pageLength; start++) {
			const response = await axios.get(
				`${process.env.BASE_URL}?ttbkey=${process.env.TTB_KEY}&QueryType=ItemNewAll&MaxResults=50&start=${start}&SearchTarget=Book&CategoryId=${categoryId}&output=js&Version=20131101&Cover=Big`,
			);
			// for문을 순회하며 얻은 데이터
			const data = await response.data.item;
			// 끝까지 for문을 돌며 push
			allCategoryData.push(...data);
		}

		// 중복 제거 로직 추가
		const uniqueItemsMap = new Map();
		allCategoryData.forEach((item) => uniqueItemsMap.set(item.itemId, item));
		const uniqueAllCategoryData = Array.from(uniqueItemsMap.values());

		// 해당 카테고리의 모든 데이터 정렬
		const sortedAllCategoryData =
			sortType === 'title'
				? uniqueAllCategoryData.sort((a, b) => a.title.localeCompare(b.title))
				: uniqueAllCategoryData.sort(
						(a, b) =>
							new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
					);
		// 데이터를 클라이언트 전송
		res.status(200).send({
			data: sortedAllCategoryData,
		});
	} catch (err) {
		res.status(400).send(err);
	}
});

// search 페이지: 검색 결과 api
app.get('/list/search', async (req, res) => {
	const { query, sortType } = req.query;
	try {
		// 첫번째 api
		const response = await axios.get(
			`${process.env.SEARCH_BASE_URL}?ttbkey=${process.env.TTB_KEY}&Query=${query}&QueryType=Keyword&MaxResults=30&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`,
		);
		// 데이터의 item 속성만 추출
		const data = await response.data.item;
		// 해당 키워드 검색의 모든 데이터를 넣어줄 배열 (+ 첫 요청에서 가져온 30개 아이템)
		const allSearchData = [...data];
		// 해당 키워드 검색의 모든 아이템 개수
		const allSearchDataLength = await response.data.totalResults;
		// 해당 키워드 검색의 데이터 요청 수(한 번에 최대 50)
		const pageLength = Math.ceil(allSearchDataLength / 50);

		// 두 번째 요청부터 마지막 요청까지 데이터 누적
		for (let start = 2; start <= pageLength; start++) {
			const response = await axios.get(
				`${process.env.SEARCH_BASE_URL}?ttbkey=${process.env.TTB_KEY}&Query=${query}&QueryType=Keyword&MaxResults=50&start=${start}&SearchTarget=Book&output=js&Version=20131101&Cover=Big`,
			);
			// for문을 순회하며 얻은 데이터
			const data = await response.data.item;
			// 끝까지 for문을 돌며 push
			allSearchData.push(...data);
		}

		// 중복 제거 로직 추가
		const uniqueItemsMap = new Map();
		allSearchData.forEach((item) => uniqueItemsMap.set(item.itemId, item));
		const uniqueAllSearchData = Array.from(uniqueItemsMap.values());

		// 해당 카테고리의 모든 데이터 정렬
		const sortedAllSearchData =
			sortType === 'title'
				? uniqueAllSearchData.sort((a, b) => a.title.localeCompare(b.title))
				: uniqueAllSearchData.sort(
						(a, b) =>
							new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
					);

		res.status(200).send({ data: sortedAllSearchData });
	} catch (err) {
		res.status(400).send(err);
	}
});

// new 페이지: 전체 신간 도서 api
app.get('/list/newSpecialAll', async (req, res) => {
	// request.query 내 categoryId 추출
	const { categoryId, page } = req.query;
	// 추출한 page를 숫자로 변환(문자열로 넘어옴)해서 startIndex에 삽입(아이템 뿌려주는 시작 숫자)
	const start = Number(page);

	try {
		const response = await axios.get(
			`${process.env.BASE_URL}?ttbkey=${process.env.TTB_KEY}&QueryType=ItemNewSpecial&MaxResults=30&start=${start}&SearchTarget=Book&CategoryId=${categoryId}&output=js&Version=20131101&Cover=Big`,
		);

		// 신간리스트의 해당 카테고리 item만 추출해 data에 할당
		const data = await response.data.item;
		// 해당 카테고리 item의 총 갯수 (약 1,700여 개(3/9 기준))
		const dataLength = await response.data.totalResults;
		res.status(200).send({ data, dataLength });
	} catch (err) {
		res.status(400).send(err);
	}
});

// best 페이지: 전체 베스트셀러 도서 api
app.get('/list/bestAll', async (req, res) => {
	// request.query 내 categoryId 추출
	const { categoryId, currentPage } = req.query;
	// 추출한 page를 숫자로 변환(문자열로 넘어옴)해서 startIndex에 삽입(아이템 뿌려주는 시작 숫자)
	const start = Number(currentPage);
	try {
		const response = await axios.get(
			`${process.env.BASE_URL}?ttbkey=${process.env.TTB_KEY}&QueryType=Bestseller&MaxResults=24&start=${start}&SearchTarget=Book&CategoryId=${categoryId}&output=js&Version=20131101&Cover=Big`,
		);
		// 베스트셀러 리스트의 해당 카테고리 item만 추출해 data에 할당
		const data = await response.data.item;
		res.status(200).send({ data });
	} catch (err) {
		res.status(400).send(err);
	}
});

// used 페이지: 전체 중고 도서 api
app.get('/list/usedAll', async (req, res) => {
	// request.query 내 categoryId 추출
	const { categoryId, page } = req.query;
	// 추출한 page를 숫자로 변환(문자열로 넘어옴)해서 startIndex에 삽입(아이템 뿌려주는 시작 숫자)
	const start = Number(page);

	try {
		const response = await axios.get(
			`${process.env.BASE_URL}?ttbkey=${process.env.TTB_KEY}&QueryType=ItemNewAll&MaxResults=30&start=${start}&SearchTarget=Used&SubSearchTarget=Book&CategoryId=${categoryId}&output=js&Version=20131101&Cover=Big`,
		);

		// 중고도서 리스트의 해당 카테고리 item만 추출해 data에 할당
		const data = await response.data.item;
		// 해당 카테고리 item의 총 갯수
		const dataLength = await response.data.totalResults;

		res.status(200).send({ data, dataLength });
	} catch (err) {
		res.status(400).send(err);
	}
});

// used 페이지: 중고 베스트셀러 도서(5개) api
app.get('/list/used', async (req, res) => {
	try {
		const response = await axios.get(
			`${process.env.BASE_URL}?ttbkey=${process.env.TTB_KEY}&QueryType=itemNewAll&MaxResults=50&start=1&SearchTarget=Used&SubSearchTarget=Book&output=js&Version=20131101&Cover=Big`,
		);

		// 중고도서 리스트의 item만 추출해 data에 할당
		const data = await response.data.item
			// 중고도서 리스트의 item을 salesPoint 높은순 소팅
			.sort((a, b) => b.salesPoint - a.salesPoint)
			// 앞에서 6개만 추출
			.slice(0, 5);

		res.status(200).send(data);
	} catch (err) {
		res.status(400).send(err);
	}
});

app.get('/community/:page', async (req, res) => {
	const { num } = req.query;
	const limit = 9;
	const offset = (num - 1) * limit;
	try {
		const { data } = await supabase
			.from(`${req.params.page}`)
			.select('*')
			.range(offset, offset + limit);
		return res.status(200).send(data);
	} catch (err) {
		res.status(400).send;
	}
});

app.get('/community/:page/:docid', async (req, res) => {
	try {
		const { data } = await supabase
			.from(`${req.params.page}`)
			.select('*')
			.eq('doc_id', req.params.docid);
		return res.status(200).send(data[0]);
	} catch (err) {
		res.status(400).send;
	}
});

// community 주간 인기글 top6
app.get('/popular/community', async (req, res) => {
	try {
		const bookReport = await supabase.from('bookReport').select('*');
		const bookMeeting = await supabase.from('bookMeeting').select('*');
		const bookBuying = await supabase.from('bookBuying').select('*');
		const bookSelling = await supabase.from('bookSelling').select('*');

		const data = [
			...bookReport.data,
			...bookMeeting.data,
			...bookBuying.data,
			...bookSelling.data,
		];
		const sortedData = data.sort((a, b) => b.like - a.like).slice(0, 6);
		res.status(200).send(sortedData);
	} catch (err) {
		res.status(400).send(err);
	}
});
