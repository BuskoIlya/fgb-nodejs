require('dotenv/config');
const express = require('express');
const cors = require('cors');

const BookController = require('./src/db/controllers/BookController');
const ContactController = require('./src/db/controllers/ContactController');
const EUCommandController = require('./src/db/controllers/EUCommandController');
const EUCommandGroupsController = require('./src/db/controllers/EUCommandGroupsController');
const EUPersonalController = require('./src/db/controllers/EUPersonalController');
const PlayerController = require('./src/db/controllers/PlayerController');
const RankController = require('./src/db/controllers/RankController');
const StoryController = require('./src/db/controllers/StoryController');
const TournamentController = require('./src/db/controllers/TournamentController');
const WAGCController = require('./src/db/controllers/WAGCController');

const app = express();
app.use(cors());
app.use(express.json());

app.get(process.env.API_BOOK, BookController.getBookById);
app.get(process.env.API_CONTACTS, ContactController.getAllContacts);
app.get(process.env.API_EU_COMMAND, EUCommandController.getAllEUCommandData);
app.get(process.env.API_EU_COMMAND_GROUPS_YEAR, EUCommandGroupsController.getAllGroupResultsByYear);
app.get(process.env.API_EU_COMMAND_GROUPS_YEAR_GROUP, EUCommandGroupsController.getDataByYearAndGroup);
app.get(process.env.API_EU_PERSONAL, EUPersonalController.getAllEUPersonalData);
app.get(process.env.API_PLAYERS, PlayerController.getAllPlayers);
app.get(process.env.API_RANKS, RankController.getAllRanks);
app.get(process.env.API_STUDY_GO_BOOKS, BookController.getAllBooks);
app.get(process.env.API_STUDY_GO_STORIES, StoryController.getAllStories);
app.get(process.env.API_STUDY_STORY, StoryController.getStoryById);
app.get(process.env.API_TOURNAMENT, TournamentController.getByTournamentById);
app.get(process.env.API_TOURNAMENT_RU, TournamentController.getTournamentById);
app.get(process.env.API_TOURNAMENT_WORLD, TournamentController.getTournamentById);
app.get(process.env.API_TOURNAMENTS_BY_YEAR, TournamentController.getTournamentsByYear);
app.get(process.env.API_TOURNAMENTS_ALL, TournamentController.getAllTournaments);
app.get(process.env.API_WORLD_CHAMPIONSHIPS, WAGCController.getAllWAGCData);

app.listen(process.env.PORT);