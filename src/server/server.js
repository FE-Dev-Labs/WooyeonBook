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

// // search book data
// const [searchData, setSearchData] = useState<SearchData[]>([]);
// const getdata = async () => {
// 	const { data } = await axios.get(
// 		`http://localhost:8080/search/book?bookName=${searchBook}`,
// 	);
// 	setSearchData(data);
// };

// useEffect(() => {
// 	const debounce = setTimeout(() => {
// 		if (searchBook.length > 1) {
// 			getdata();
// 		}
// 	}, 700);
// 	return () => clearTimeout(debounce);
// }, [searchBook]);
