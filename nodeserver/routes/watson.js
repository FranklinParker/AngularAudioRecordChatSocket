var express = require('express');
var router = express.Router();
const speechToTextService = require('../service/watsonSpeechToText').speechToTextService;
const FormData = require('form-data');
var multer = require('multer');
const fs = require('fs');
const upload = multer({dest: './public/images'});


/**
 * gets watson users
 *
 *
 */
router.post('/user', async function (req, res, next) {
	try {

		const user = await watsonUserService.saveUser(req.body);
		res.send({
			success: true,
			message: 'User Saved',
			data: user
		});
	} catch (e) {
		res.send({success: false, message: e.message});
	}

});


/**
 * gets the stt result for file passed in
 *
 */
router.post('/fileUpload', upload.single('file'), async (req, res, next) => {
	console.log('got file', req.file)
	res.send({
		success: true,
		file: {
			originalName: req.file.originalname,
			mimetype: req.file.mimetype
		}
	});

});

/**
 * gets the stt result for file passed in
 *
 */
router.post('/speechToText', upload.single('file'), async (req, res, next) => {
	const speechToTextConfig ={
		username: req.body.username,
		password: req.body.password,
		customization_id: req.body.customization_id,
		acoustic_customization_id:req.body.acoustic_customization_id,
		model: req.body.model,
		keywords: req.body.keywords
	};

	console.log('speechToTextConfig:' , speechToTextConfig);


  try {
		const sttResult = await speechToTextService.speechToText(speechToTextConfig, req.file);
		if (sttResult) {

			return res.send({success: true, usingFile: true, data: result});


		}else{
			res.send({success: false, message: 'failed'});
		}
	}catch(e){
		res.send({success: false, message: e});

	}
});



/**
 * gets a session id for usename and password
 *
 *
 */
router.get('/session/:username/:password', async function (req, res, next) {
	try {
		const username = req.params.username;
		const password = req.params.password;
		const result = await getWatsonSession(username, password);
		res.send({
			result: 'success',
			data: result.data
		});
	} catch (e) {
		res.send({result: 'error', data: {errorMessage: e.message}});
	}

});

module.exports = router;

/**
 * method to return a session id
 *
 * @param username
 * @param password
 * @returns {Promise<*>}
 */
const getWatsonSession = async (username, password) => {
	return axios({
		method: 'post',
		url: 'https://socket.watsonplatform.net/speech-to-text/api/v1/sessions',
		auth: {
			username: username,
			password: password
		},
	});
}

