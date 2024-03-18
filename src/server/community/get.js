const express = require('express');

const router = express.Router();


// 커뮤니티 update api

router.get('/api/community/bookReport/:docid', async (req, res) => {
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

router.get('/api/community/bookMeeting/:docid', async (req, res) => {
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

router.get('/api/community/bookBuying/:docid', async (req, res) => {
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

router.get('/api/community/bookSelling/:docid', async (req, res) => {
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

router.get('/community/:page', async (req, res) => {
	try {
		const { data } = await supabase.from(`${req.params.page}`).select('*');
		return res.status(200).send(data);
	} catch (err) {
		res.status(400).send;
	}
});

router.get('/community/:page/:docid', async (req, res) => {
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
router.get('/popular/community', async (req, res) => {
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




module.exports = router;