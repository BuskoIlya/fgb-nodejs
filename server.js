require('dotenv/config');
const express = require('express');
const cors = require('cors');

const BookController = require('./src/db/controllers/BookController');
const ContactController = require('./src/db/controllers/ContactController');
const PlayerController = require('./src/db/controllers/PlayerController');
const RankController = require('./src/db/controllers/RankController');
const TournamentController = require('./src/db/controllers/TournamentController');
const WAGCController = require('./src/db/controllers/WAGCController');
const EUCommandController = require('./src/db/controllers/EUCommandController');

const euPersonal = require("./src/eu_personal.js");
const euCommand1920A = require("./src/eu_command_19-20_A.js");
const euCommand1920B = require("./src/eu_command_19-20_B.js");
const euCommand1920C = require("./src/eu_command_19-20_C.js");
const euCommand1920D = require("./src/eu_command_19-20_D.js");
const euCommand2021A = require("./src/eu_command_20-21_A.js");
const euCommand2021B = require("./src/eu_command_20-21_B.js");
const euCommand2021C = require("./src/eu_command_20-21_C.js");
const euCommand2021D = require("./src/eu_command_20-21_D.js");
const goStudyStories = require("./src/go_study_stories.js");

const app = express();
app.use(cors());
app.use(express.json());

app.get(process.env.API_BOOK, BookController.getBookById);
app.get(process.env.API_CONTACTS, ContactController.getAllContacts);
app.get(process.env.API_EU_COMMAND, EUCommandController.getAllEUCommandData);
app.get(process.env.API_PLAYERS, PlayerController.getAllPlayers);
app.get(process.env.API_RANKS, RankController.getAllRanks);
app.get(process.env.API_STUDY_GO_BOOKS, BookController.getAllBooks);
app.get(process.env.API_TOURNAMENT, TournamentController.getByTournamentById);
app.get(process.env.API_TOURNAMENT_RU, TournamentController.getTournamentById);
app.get(process.env.API_TOURNAMENT_WORLD, TournamentController.getTournamentById);
app.get(process.env.API_TOURNAMENTS_BY_YEAR, TournamentController.getTournamentsByYear);
app.get(process.env.API_TOURNAMENTS_ALL, TournamentController.getAllTournaments);
app.get(process.env.API_WORLD_CHAMPIONSHIPS, WAGCController.getAllWAGCData);

//------------------------------------------------------------------------------
app.get(process.env.API_EU_PERSONAL, function (req, res) { res.json(euPersonal) });
app.get(process.env.API_EU_COMMAND_19_20_A, function (req, res) { res.json(euCommand1920A) });
app.get(process.env.API_EU_COMMAND_19_20_B, function (req, res) { res.json(euCommand1920B) });
app.get(process.env.API_EU_COMMAND_19_20_C, function (req, res) { res.json(euCommand1920C) });
app.get(process.env.API_EU_COMMAND_19_20_D, function (req, res) { res.json(euCommand1920D) });
app.get(process.env.API_EU_COMMAND_20_21_A, function (req, res) { res.json(euCommand2021A) });
app.get(process.env.API_EU_COMMAND_20_21_B, function (req, res) { res.json(euCommand2021B) });
app.get(process.env.API_EU_COMMAND_20_21_C, function (req, res) { res.json(euCommand2021C) });
app.get(process.env.API_EU_COMMAND_20_21_D, function (req, res) { res.json(euCommand2021D) });
app.get(process.env.API_GO_STUDY_STORIES, function (req, res) { res.json(goStudyStories) });

app.listen(process.env.PORT);