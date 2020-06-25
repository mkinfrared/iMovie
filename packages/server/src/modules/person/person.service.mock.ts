/* eslint-disable @typescript-eslint/camelcase */
const personServiceMock = {
  fetchPeople: jest.fn(),
  createMany: jest.fn(),
  getMany: jest.fn(),
  getFailedIds: jest.fn()
};

const personResponseMock = [
  {
    status: "fulfilled",
    value: {
      data: {
        birthday: "1974-11-11",
        known_for_department: "Acting",
        deathday: null,
        id: 6193,
        name: "Leonardo DiCaprio",
        also_known_as: [
          "Леонардо ДиКаприо",
          "ليوناردو دي كابريو",
          "레오나르도 디카프리오",
          "レオナルド・ディカプリオ",
          "ลีโอนาร์โด ดิแคพรีโอ",
          "莱昂纳多·迪卡普里奥",
          "Leo DiCaprio",
          "Leonardo Retardo",
          "Leo",
          "Leonardo Wilhelm DiCaprio",
          "Λεονάρντο Ντι Κάπριο",
          "Ντι Κάπριο"
        ],
        gender: 2,
        biography:
          "Leonardo DiCaprio (born November 11, 1974) is an American actor, film producer, and environmental activist.\n\nHe began his film career by starring as Josh in Critters 3 before starring in the film adaptation of the memoir This Boy's Life (1993) alongside Robert De Niro. DiCaprio was praised for his supporting role in the drama What's Eating Gilbert Grape (1993), and gained public recognition with leading roles in the drama The Basketball Diaries (1995) and the romantic drama Romeo + Juliet (1996), before achieving international fame with James Cameron's epic romance Titanic (1997) He has been nominated for six Academy Awards—five for acting and one for producing—and in 2016, he won the Academy Award for Best Actor for The Revenant.\n\nDiCaprio is the founder of his own production company, named Appian Way Productions. He is also a committed environmentalist.",
        popularity: 27.248,
        place_of_birth: "Los Angeles, California, USA",
        profile_path: "/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",
        adult: false,
        imdb_id: "nm0000138",
        homepage: "http://leonardodicaprio.com"
      }
    }
  },
  {
    status: "rejected",
    reason: {
      message: "timeout of 120000ms exceeded",
      name: "Error",
      stack:
        "Error: timeout of 120000ms exceeded\n    at createError (D:\\mkinfrared\\Documents\\Mega\\Projects\\imovie\\node_modules\\axios\\lib\\core\\createError.js:16:15)\n    at ClientRequest.handleRequestTimeout (D:\\mkinfrared\\Documents\\Mega\\Projects\\imovie\\node_modules\\axios\\lib\\adapters\\http.js:256:16)\n    at Object.onceWrapper (events.js:421:28)\n    at ClientRequest.emit (events.js:327:22)\n    at TLSSocket.emitRequestTimeout (_http_client.js:709:9)\n    at Object.onceWrapper (events.js:421:28)\n    at TLSSocket.emit (events.js:327:22)\n    at TLSSocket.Socket._onTimeout (net.js:481:8)\n    at listOnTimeout (internal/timers.js:549:17)\n    at processTimers (internal/timers.js:492:7)",
      config: {
        url: "/person/1018001",
        method: "get",
        params: {
          language: "en-US",
          include_adult: true
        },
        headers: {
          Accept: "application/json, text/plain, */*",
          "User-Agent": "axios/0.19.2"
        },
        baseURL: "https://api.themoviedb.org/3",
        transformRequest: [null],
        transformResponse: [null],
        timeout: 120000,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1
      },
      code: "ECONNABORTED"
    }
  }
];

export { personServiceMock, personResponseMock };
