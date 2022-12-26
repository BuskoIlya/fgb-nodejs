const allTournaments = [
  {
    id: "minsk-cup-2022-03-20",
	  title: "Кубок Минска 2022",
    place: "Минск",
    placeImg: "minsk.jpg",
    date: "2022-03-20",
    author: "Грунковский Ю.А.",
    address: "КГС, белорусская комната"
  },
  {
    id: "black-pawn-2022-04-02",
	  title: "Чёрная пешка 2022",
    place: "Минск",
    placeImg: "minsk.jpg",
    date: "2022-04-02",
    author: "Грунковский Ю.А.",
    address: "Брест, ул. Московская 151"
  },
  {
    id: "clever-stork-1-2022-04-23",
	  title: "Умный Аист 2022. Тур 1",
    place: "Минск",
    placeImg: "minsk.jpg",
    date: "2022-04-23",
    author: "Бусько И.В., Грунковский Ю.А.",
    address: "КГС, белорусская комната"
  },
  {
    id: "cheerful-stream-2022-04-29",
	  title: "Весёлый ручей 2022",
    place: "Минск",
    placeImg: "minsk.jpg",
    date: "2022-04-29",
    author: "Грунковский Ю.А.",
    address: "Минск, МДДМ"
  },
  {
	  id: "clever-stork-1-2022-05-14",
    title: "Умный Аист 2022. Тур 2",
    place: "Минск",
    placeImg: "minsk.jpg",
    date: "2022-05-14",
    author: "Бусько И.В., Грунковский Ю.А.",
    address: "КГС, белорусская комната"
  },
  {
	  id: "cheerful-stream-2022-05-20",
    title: "Юношеский чемпионат Беларуси 2022",
    place: "Минск",
    placeImg: "minsk.jpg",
    date: "2022-05-20",
    author: "Грунковский Ю.А.",
    address: "Минск, МДДМ"
  },
  {
	  id: "autumn-leaf-2022-11-04",
    title: "Осенний лист 2022",
    place: "Минск",
    placeImg: "minsk.jpg",
    date: "2022-11-04",
    author: "Грунковский Ю.А.",
    address: "Минск, МДДМ"
  },
  {
    id: "by-championship-2022-11-19",
	  title: "Чемпионат Беларуси 2022",
    place: "Минск",
    placeImg: "minsk.jpg",
    date: "2022-11-19",
    author: "Грунковский Ю.А.",
    address: "КГС, белорусская комната",
    tables: [
      {
        roundsCount: 3,
        coeffNames: ["SOS", "SDOS"],
        items: [
          {
            player: "Бусько Илья Владимирович", city: "Витебск", rank: "2 дан", score: "2234",
            rounds: ["1+", "2+", "3+"],
            total: "2",
            coeffs: ["12", "7"]
          },
          {
            player: "Грунковский Юрий Анатольевич", city: "Минск", rank: "2 кю", score: "1900",
            rounds: ["1+", "2+", "3+"],
            total: "1",
            coeffs: ["12", "7"]
          }
        ]
      }
    ]
  }
]

module.exports = allTournaments;