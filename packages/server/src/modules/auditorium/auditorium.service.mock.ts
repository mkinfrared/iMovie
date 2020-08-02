const auditoriumMock: any = {
  id: 66,
  name: "Cartman",
  cinemaId: 33,
  seats: [
    {
      id: 21,
      row: "A",
      number: 3,
      auditoriumId: 66,
      deletedAt: null
    },
    {
      id: 24,
      row: "B",
      number: 6,
      auditoriumId: 66,
      deletedAt: "foobar"
    }
  ]
};

const auditoriumDtoMock = {
  name: "Cartman",
  cinemaId: 33,
  A: 12
};

const auditoriumServiceMock = {
  create: jest.fn(),
  getOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getMany: jest.fn()
};

export { auditoriumMock, auditoriumServiceMock, auditoriumDtoMock };
