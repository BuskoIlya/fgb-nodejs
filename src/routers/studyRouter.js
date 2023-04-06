const Router = require('express');
const router = new Router();

const {
  booksController,
  storiesController
} = require('../components');

router.get(process.env.API_STUDY_GO_BOOKS, booksController.getAllBooks);
router.get(process.env.API_STUDY_GO_BOOK, booksController.getBookById);
router.get(process.env.API_STUDY_GO_STORIES, storiesController.getAllStories);
router.get(process.env.API_STUDY_GO_STORY, storiesController.getStoryById);

module.exports = router;