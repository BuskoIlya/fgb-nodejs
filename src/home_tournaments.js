const util = require("./util.js");

const home_tournaments = [
  {
    photo: "2022-03-20-minsk-cup_288-192.jpg",
    title: "Кубок Минска",
    ref: "/tournament/minsk-cup-2022-03-20",
    date: "2022-03-20",
    author: "Грунковский Ю.А.",
    address: "КГС, белорусская комната"
  },
  {
    photo: "2022-04-02-black-pawn_288-192.jpg",
    title: "Чёрная пешка",
    ref: "/tournament/black-pawn-2022-04-02",
    date: "2022-04-02",
    author: "Грунковский Ю.А.",
    address: "Брест, ул. Московская 151"
  },
  {
    photo: "2022-04-23-clever-stork-1_288-192.jpg",
    title: "Умный Аист. Тур 1",
    ref: "/tournament/clever-stork-1-2022-04-23",
    date: "2022-04-23",
    author: "Бусько И.В., Грунковский Ю.А.",
    address: "КГС, белорусская комната"
  },
  {
    photo: "2022-04-29-cheerful-stream_288-192.jpg",
    title: "Весёлый ручей",
    ref: "/tournament/cheerful-stream-2022-04-29",
    date: "2022-04-29",
    author: "Грунковский Ю.А.",
    address: "Минск, МДДМ"
  },
  {
    photo: "2022-05-14-clever-stork-2_288-192.jpg",
    title: "Умный Аист. Тур 2",
    ref: "/tournament/clever-stork-1-2022-05-14",
    date: "2022-05-14",
    author: "Бусько И.В., Грунковский Ю.А.",
    address: "КГС, белорусская комната"
  },
  {
    photo: "2022-05-20-by-junior-championship_288-192.jpg",
    title: "Юношеский чемпионат Беларуси",
    ref: "/tournament/cheerful-stream-2022-05-20",
    date: "2022-05-20",
    author: "Грунковский Ю.А.",
    address: "Минск, МДДМ"
  },
  {
    photo: "2022-11-04-autumn-leaf_288-192.jpg",
    title: "Осенний лист",
    ref: "/tournament/autumn-leaf-2022-11-04",
    date: "2022-11-04",
    author: "Грунковский Ю.А.",
    address: "Минск, МДДМ"
  },
  {
    photo: "2022-11-19-by-championship_288-192.jpg",
    title: "Чемпионат Беларуси",
    ref: "/tournament/by-championship-2022-11-19",
    date: "2022-11-19",
    author: "Грунковский Ю.А.",
    address: "КГС, белорусская комната"
  }
]

home_tournaments.sort(util.decreaseByStrField("date"));
module.exports = home_tournaments;