module.exports = {

	index: async function(req, res) {
        return res.render('index');
	},

    translate: async function(req, res) {
		let input_text = req.body.input_translate;
		let input_lang = req.body.input_lang;
		let output_lang = req.body.output_lang;
	
        await page.waitFor('textarea');
		await page.$eval('textarea', (el, input_text) => el.value = input_text, input_text);
		await page.type('textarea', String.fromCharCode(13));
		await page.select('#source-language-selector', input_lang);
		await page.select('#target-language-selector', output_lang);

		
        let data_translate = new Promise((resovle, reject) => {
			page.on("response", async (response) => {
				console.log('response.url()'+ response.url());
				if(response.url().search('https://translator-api.glosbe.com/translateByLangDetect') != -1) {
					if (300 > response.status() && 200 <= response.status()) {
						data_translate = JSON.stringify(await response.json())
						resovle({
							status: response.status(),
							data: JSON.stringify(await response.json())
						});
					} else {
						reject({
							status: response.status(),
							data: JSON.stringify(await response.json())
						});
					}
				};
			});
		})
		
        let result = await data_translate;

		if (result.status == 200) {
			return res.status(200).json(result);
		} else {
			return res.status(500).json(result);
		}
    },
}