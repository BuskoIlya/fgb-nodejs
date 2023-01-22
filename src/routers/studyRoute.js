const Router = require('express');
const router = new Router();

const {
  BookController,
  StoryController
} = require('../db/controllers');

router.get(process.env.API_STUDY_GO_BOOKS, BookController.getAllBooks);
router.get(process.env.API_STUDY_GO_BOOK, BookController.getBookById);
router.get(process.env.API_STUDY_GO_STORIES, StoryController.getAllStories);
router.get(process.env.API_STUDY_GO_STORY, StoryController.getStoryById);

module.exports = router;