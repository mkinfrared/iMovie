import { cinemaMock } from "modules/cinema/cinema.service.mock";

const auditoriumMock = {
  id: 66,
  name: "Cartman",
  cinemaId: cinemaMock.id
};

const auditoriumDtoMock = {
  name: "Cartman",
  cinemaId: cinemaMock.id
};

const auditoriumServiceMock = {
  create: jest.fn(),
  getOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
};

export { auditoriumMock, auditoriumServiceMock, auditoriumDtoMock };
