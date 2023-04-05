const Router = require('express');
const router = new Router();

const {
  StoryController
} = require('../db/controllers');

const {
  booksController
} = require('../components');

router.get(process.env.API_STUDY_GO_BOOKS, booksController.getAllBooks);
router.get(process.env.API_STUDY_GO_BOOK, booksController.getBookById);
router.get(process.env.API_STUDY_GO_STORIES, StoryController.getAllStories);
router.get(process.env.API_STUDY_GO_STORY, StoryController.getStoryById);

module.exports = router;