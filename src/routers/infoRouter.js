const Router = require('express');
const router = new Router();

const {
  ContactController,
  NewsController,
  RankController
} = require('../db/controllers');

router.get(process.env.API_INFO_CONTACTS, ContactController.getAllContacts);
router.get(process.env.API_INFO_NEWS, NewsController.getAllNews);
router.get(process.env.API_INFO_RANKS, RankController.getAllRanks);

module.exports = router;