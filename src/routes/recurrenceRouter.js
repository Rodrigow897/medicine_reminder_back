const express = require('express');
const router = express.Router();
const recurrenceRouter = require('../controllers/recurrencesController');

router.get('/', recurrenceRouter.getRecurrence);
router.post('/', recurrenceRouter.createRecurrence);

module.exports = router;