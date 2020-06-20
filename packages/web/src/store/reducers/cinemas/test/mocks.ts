import { Cinema } from "store/reducers/cinemas/types";

const cinemaMock: Cinema = {
  id: 1,
  name: "Terrence",
  zipcodeId: 1,
  createdAt: "2020-05-06T16:57:23.012Z",
  updatedAt: "2020-05-06T16:57:23.012Z",
  zipcode: {
    id: 1,
    code: "92506",
    longitude: "-117.3757",
    latitude: "33.9455",
    cityId: 1,
    stateId: 1,
    countryId: "US",
    createdAt: "2020-05-06T16:57:14.751Z",
    updatedAt: "2020-05-06T16:57:15.946Z",
    city: {
      id: 1,
      name: "Riverside",
      stateId: 1,
      countryId: "US",
      createdAt: "2020-05-06T16:57:14.744Z",
      updatedAt: "2020-05-06T16:57:14.744Z"
    },
    state: {
      id: 1,
      name: "California",
      abbreviation: "CA",
      countryId: "US",
      createdAt: "2020-05-06T16:57:14.725Z",
      updatedAt: "2020-05-06T16:57:14.725Z"
    },
    country: {
      alpha2Code: "US",
      name: "United States of America",
      alpha3Code: "USA",
      callingCode: 1,
      region: "Americas",
      subregion: "Northern America",
      nativeName: "United States",
      flag: "https://restcountries.eu/data/usa.svg",
      cioc: "USA",
      createdAt: "2020-05-06T16:56:46.852Z",
      updatedAt: "2020-05-06T16:56:46.852Z"
    }
  }
};

const auditoriumsMock = [
  {
    id: 1,
    name: "Mercury",
    cinemaId: 1,
    createdAt: "2020-05-17T08:16:44.603Z",
    updatedAt: "2020-05-17T08:16:44.603Z",
    seats: [
      {
        id: 1,
        row: "A",
        number: 1,
        auditoriumId: 1,
        deletedAt: null
      },
      {
        id: 2,
        row: "B",
        number: 1,
        auditoriumId: 1,
        deletedAt: null
      }
    ]
  }
];

const fetchCinemaAuditoriumsPayloadMock = {
  ...cinemaMock,
  auditoriums: auditoriumsMock
};

const cinemaStateMock = {
  data: [cinemaMock],
  page: 42
};

export {
  cinemaMock,
  cinemaStateMock,
  auditoriumsMock,
  fetchCinemaAuditoriumsPayloadMock
};
