module.exports = {
    index: async function(req, res) {
        console.log(await puppeteer);
        await puppeteer.page.waitFor('input[name=q]');
		await puppeteer.page.$eval('input[name=q]', el => el.value = 'schule');
        await puppeteer.page.click('button[type="submit"]');
        
        let data_translate = new Promise(resovle => {
			page.on("response", async (response) => {
				if(response.url().search('https://iapi.glosbe.com/iapi3/translate') != -1) {
					if (300 > response.status() && 200 <= response.status()) {
						console.log(response.url().search('https://iapi.glosbe.com/iapi3/translate') != -1);
						data_translate = JSON.stringify(await response.json())
						resovle(JSON.stringify(await response.json()));
					}
				};
			});
        })
        
        console.log(await data_translate);

        // return res.render('index');
    },

}
