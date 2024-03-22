const express = require('express');
const axios = require('axios');
const cors = require('cors');
const router = express.Router();

module.exports = router;

require('dotenv').config();

// // new 페이지: 전체 신간 도서 api
// router.get('/list/newSpecialAll', async (req, res) => {
// 	// request.query 내 categoryId 추출
// 	const { categoryId, page } = req.query;
// 	// 추출한 page를 숫자로 변환(문자열로 넘어옴)해서 startIndex에 삽입(아이템 뿌려주는 시작 숫자)
// 	const start = Number(page);

// 	try {
// 		const response = await axios.get(
// 			`${process.env.NEXT_PUBLIC_BASE_URL}?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=ItemNewSpecial&MaxResults=30&start=${start}&SearchTarget=Book&CategoryId=${categoryId}&output=js&Version=20131101&Cover=Big`,
// 		);

// 		// 신간리스트의 해당 카테고리 item만 추출해 data에 할당
// 		const data = await response.data.item.filter(
// 			// 책 제목 필터링
// 			(item) => !item.title.includes('큰글자책', '빅북', '세트'),
// 		);
// 		// 해당 카테고리 item의 총 갯수 (약 1,700여 개(3/9 기준))
// 		const dataLength = await response.data.totalResults;
// 		res.status(200).send({ data, dataLength });
// 	} catch (err) {
// 		res.status(400).send(err);
// 	}
// });

router.get('/list/usedAll', async (req, res) => {
	// request.query 내 categoryId 추출
	const { categoryId, page } = req.query;
	// 추출한 page를 숫자로 변환(문자열로 넘어옴)해서 startIndex에 삽입(아이템 뿌려주는 시작 숫자)
	const start = Number(page);

	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=ItemNewAll&MaxResults=30&start=${start}&SearchTarget=Used&SubSearchTarget=Book&CategoryId=${categoryId}&output=js&Version=20131101&Cover=Big`,
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
