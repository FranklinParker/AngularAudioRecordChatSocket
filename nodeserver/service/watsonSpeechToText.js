var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');
//var file = '/Users/franklinparker/documents/GBSLendingSolutions/SpeechToText/mortgage.wav';


// or streaming
const speechToText = async (speechToTextConfig, file) => {
	return new Promise((resolve, reject) => {
		try {
			var speechToText = new SpeechToTextV1({
				username: speechToTextConfig.username,
				password: speechToTextConfig.password,
				url: 'https://socket.watsonplatform.net/speech-to-text/api/'
			});		
			var params = {
				audio: fs.createReadStream(file.path),
				model :  speechToTextConfig.model,
				content_type: file.mimetype,
				customization_id : speechToTextConfig.customization_id,
				acoustic_customization_id: speechToTextConfig.acoustic_customization_id,
				keywords: speechToTextConfig.keywords,
     			keywords_threshold:'0.1'
			};
			speechToText.recognize(params, function (err, res) {
				if (err)
					reject(err);
				else
					resolve(res);
			});
		}catch(e){
			reject(e);
		}

	});
}

module.exports.speechToTextService = {
	speechToText
}
