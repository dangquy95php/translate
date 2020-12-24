const router   = express.Router();

const TranslateController = require('../app/Controllers/TranslateController');

router.get('/', TranslateController.index);

module.exports = router;
