import { countryMock } from "modules/country/country.service.mock";
import { stateMock } from "modules/state/state.service.mock";

const cityServiceMock = {
  upsert: jest.fn()
};
const cityMock = {
  id: 47,
  stateId: stateMock.id,
  name: "Riverside",
  countryId: countryMock.alpha2Code
};

export { cityMock, cityServiceMock };
