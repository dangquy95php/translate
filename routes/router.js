const router   = express.Router();

const TranslateController = require('../app/Controllers/TranslateController');

router.get('/', TranslateController.index);
router.get('/translate', TranslateController.translate);


module.exports = router;
