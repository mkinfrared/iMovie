const countryMock = {
  alpha2Code: "MA",
  name: "Marklar",
  nativeName: "Marklar",
  flag: "http://marklar/flag",
  cioc: "cioc",
  callingCode: 42,
  alpha3Code: "MAR",
  region: "Foo",
  subregion: "Bar"
};

const countryServiceMock = {
  getAll: jest.fn(),
  getOne: jest.fn()
};

export { countryMock, countryServiceMock };
