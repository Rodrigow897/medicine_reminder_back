const express = require('express'); 
const prescriptionsController = require('../controllers/prescriptionsController')
const router = express.Router()

router.get('/', prescriptionsController.getLembretes)
router.post('/', prescriptionsController.createLembrete)
router.put('/:id', prescriptionsController.updateLembrete)
router.delete('/:id', prescriptionsController.deleteLembrete)

module.exports = router