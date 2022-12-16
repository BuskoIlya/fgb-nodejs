const item = {
  photo: "2022-03-20-minsk-cup_288-192.jpg",
  title: "Кубок Минска",
  ref: "minsk-cup-2022-03-20",
  date: "2022-03-20",
  address: "КГС, белорусская комната",
  author: "Грунковский Ю.А."
}
const tournaments2022 = [];
const tournaments2021 = [];
const tournaments2020 = [];
const tournaments2019 = [];
const tournaments2018 = [];

for (let i = 0; i < 10; i++) {
  tournaments2022.push(item);
  tournaments2021.push(item);
  tournaments2020.push(item);
  tournaments2019.push(item);
  tournaments2018.push(item);
}

const tournaments = [
  {
    year: "2022",
    items: tournaments2022
  },
  {
    year: "2021",
    items: tournaments2021
  },
  {
    year: "2020",
    items: tournaments2020
  },
  {
    year: "2019",
    items: tournaments2019
  },
  {
    year: "2018",
    items: tournaments2018
  }
];

module.exports = tournaments;