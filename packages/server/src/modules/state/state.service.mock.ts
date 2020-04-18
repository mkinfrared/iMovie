import { countryMock } from "modules/country/country.service.mock";

const stateMock = {
  id: 88,
  name: "California",
  abbreviation: "CA",
  countryId: countryMock.alpha2Code
};
const stateServiceMock = {
  upsert: jest.fn()
};

export { stateMock, stateServiceMock };
