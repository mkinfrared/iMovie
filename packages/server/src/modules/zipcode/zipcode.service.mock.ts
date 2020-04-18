import { cityMock } from "modules/city/city.service.mock";
import { countryMock } from "modules/country/country.service.mock";

const zipcodeServiceMock = {
  create: jest.fn(),
  getByCodeAndCountry: jest.fn(),
  getAll: jest.fn(),
  getOne: jest.fn(),
  createZipcodesByCity: jest.fn()
};
const zipcodeMock = {
  code: "92506",
  longitude: "42.99",
  latitude: "99.42",
  countryId: countryMock.alpha2Code,
  cityId: cityMock.id
};

export { zipcodeMock, zipcodeServiceMock };
