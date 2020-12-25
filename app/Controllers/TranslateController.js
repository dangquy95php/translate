module.exports = {

	index: async function(req, res) {
        return res.render('index');
	},

    translate: async function(req, res) {
		console.log('controller');
		let input_text = req.query.input_translate;
        await page.waitFor('input[name=q]');
		await page.$eval('input[name=q]', (el, input_text) => el.value = input_text, input_text);
        await page.click('button[type="submit"]');
		console.log('await page.click(button[type="submit"]);');
		
        let data_translate = new Promise((resovle, reject) => {
			page.on("response", async (response) => {
				console.log('response.url(): '+ response.url());
				if(response.url().search('https://iapi.glosbe.com/iapi3/translate') != -1) {
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
