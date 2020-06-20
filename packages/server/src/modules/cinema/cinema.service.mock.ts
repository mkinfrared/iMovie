import { auditoriumMock } from "modules/auditorium/auditorium.service.mock";
import { zipcodeMock } from "modules/zipcode/zipcode.service.mock";

const cinemaMock = {
  id: 33,
  name: "Terrence",
  zipcodeId: zipcodeMock.id,
  auditoriums: [auditoriumMock]
};

const cinemaDtoMock = {
  name: "Terrence",
  zipcodeId: zipcodeMock.id
};

const cinemaServiceMock = {
  create: jest.fn(),
  get: jest.fn(),
  getAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
};

export { cinemaMock, cinemaDtoMock, cinemaServiceMock };
