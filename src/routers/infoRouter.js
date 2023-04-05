const Router = require('express');
const router = new Router();

const {
  ContactController,
  NewsController
} = require('../db/controllers');

const {
  ranksController
} = require('../components');

router.get(process.env.API_INFO_CONTACTS, ContactController.getAllContacts);
router.get(process.env.API_INFO_NEWS, NewsController.getAllNews);
router.get(process.env.API_INFO_RANKS, ranksController.getAllRanks);

module.exports = router;