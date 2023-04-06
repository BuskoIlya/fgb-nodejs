module.exports = {
  booksController: require('./books'),
  contactsController: require('./contacts'),
  countriesModel: require('./countries'),
  eucommandController: require('./eucommand'),
  eucommandGroupsController: require('./eucommand-group'),
  eupersonalController: require('./eupersonal'),
  nationalTeamGameController: require('./national-team-game').nationalTeamGameController,
  newsController: require('./news'),
  playersController: require('./players'),
  ranksController: require('./ranks'),
  storiesController: require('./stories'),
  tournamentController: require('./tournament').tournamentController,
  userController: require('./user'),
  wagcController: require('./wagc')
};