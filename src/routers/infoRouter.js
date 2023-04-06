const Router = require('express');
const router = new Router();

const {
  contactsController,
  newsController,
  ranksController
} = require('../components');

router.get(process.env.API_INFO_CONTACTS, contactsController.getAllContacts);
router.get(process.env.API_INFO_NEWS, newsController.getAllNews);
router.get(process.env.API_INFO_RANKS, ranksController.getAllRanks);

module.exports = router;