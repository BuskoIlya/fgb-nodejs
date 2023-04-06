const Router = require('express');
const router = new Router();

const {
  NewsController
} = require('../db/controllers');

const {
  contactsController,
  ranksController
} = require('../components');

router.get(process.env.API_INFO_CONTACTS, contactsController.getAllContacts);
router.get(process.env.API_INFO_NEWS, NewsController.getAllNews);
router.get(process.env.API_INFO_RANKS, ranksController.getAllRanks);

module.exports = router;