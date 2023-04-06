module.exports = {
  getAllTournaments,
  getByTournamentById,
  getTournamentById,
  getTournamentsByYear
};

const { ApiError } = require('../../exceptions');
const tournamentModel = require('./tournamentModel');
const countriesModel = require('../countries');

async function getAllTournaments() {
  const years = [2018, 2019, 2020, 2021, 2022, 2023];
  const result = await Promise.all(
    years.map(async (year) => {
      const items = await tournamentModel.getAllByYear(year);
      if (!items) {
        throw ApiError.BadRequest('Не удалось получить данные о турнирах');
      }
      return { year, items };
  }));
  return result;
}

async function getByTournamentById(id) {
  const error = ApiError.BadRequest('Не удалось получить данные о турнире');
  const tournamentInfo = await tournamentModel.getInfoById(id);
  if (!tournamentInfo) {
    throw error;
  }
  const tablesInfo = await tournamentModel.getTablesInfoById(id);
  if (!tablesInfo) {
    throw error;
  }
  const tables = await Promise.all(
    tablesInfo.map(
      async (x) => {
        const result = await tournamentModel.getByResultsByName(x.name);
        if (!result) {
          throw error;
        }
        return { info: x, items: result };
      }
    )
  );
  return { ...tournamentInfo, tables };
}

async function getTournamentById(id, url) {
  const error = ApiError.BadRequest('Не удалось получить данные о турнире');
  const tournamentInfo = await tournamentModel.getInfoById(id);
  if (!tournamentInfo) {
    throw error;
  }
  const tablesInfo = await tournamentModel.getTablesInfoById(id);
  if (!tablesInfo) {
    throw error;
  }
  const tables = await Promise.all(
    tablesInfo.map(
      async (item) => {
        const result = await tournamentModel.getResultsByName(item.name);
        if (!result) {
          throw error;
        }
        if (url.includes('world')) {
          const countries = await countriesModel.getAll();
          if (!countries) {
            throw error;
          }
          result.forEach(x => {
            const country = countries.find(c => c.id === x.country);
            x.country = country;
          });
        }
        return { info: item, items: result };
      }
    )
  );
  return { ...tournamentInfo, tables };
}

async function getTournamentsByYear(year) {
  const result = await tournamentModel.getAllByYear(year);
  if (!result) {
    throw ApiError.BadRequest('Не удалось получить данные о турнирах');
  }
  return result;
}