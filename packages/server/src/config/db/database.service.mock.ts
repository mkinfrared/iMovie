export const repositoryMock = {
  save: jest.fn((data: any) => data),
  find: jest.fn(),
  findOne: jest.fn((..._: any): any => undefined),
  update: jest.fn((..._: any): any => undefined),
  delete: jest.fn((..._: any): any => "deleted")
};
