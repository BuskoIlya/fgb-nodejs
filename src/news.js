const item = {
  photo: "2022-03-20-minsk-cup_288-192.jpg",
  title: "Кубок Минска",
  ref: "minsk-cup-2022-03-20",
  date: "2022-03-20",
  address: "КГС, белорусская комната",
  author: "Грунковский Ю.А."
}
const news2022 = [];
const news2021 = [];
const news2020 = [];
const news2019 = [];
const news2018 = [];

for (let i = 0; i < 5; i++) {
  news2022.push(item);
  news2021.push(item);
  news2020.push(item);
  news2019.push(item);
  news2018.push(item);
}

const news = [
  {
    year: "2022",
    items: news2022
  },
  {
    year: "2021",
    items: news2021
  },
  {
    year: "2020",
    items: news2020
  },
  {
    year: "2019",
    items: news2019
  },
  {
    year: "2018",
    items: news2018
  }
];

module.exports = news;