import { cityMock } from "modules/city/city.service.mock";
import { countryMock } from "modules/country/country.service.mock";
import { stateMock } from "modules/state/state.service.mock";

const zipcodeServiceMock = {
  create: jest.fn(),
  getByCodeAndCountry: jest.fn(),
  getAll: jest.fn(),
  getOne: jest.fn(),
  createZipcodesByCity: jest.fn()
};

const zipcodeMock = {
  id: 47,
  code: "92506",
  longitude: "42.99",
  latitude: "99.42",
  countryId: countryMock.alpha2Code,
  cityId: cityMock.id,
  stateId: stateMock.id
};

export { zipcodeMock, zipcodeServiceMock };
