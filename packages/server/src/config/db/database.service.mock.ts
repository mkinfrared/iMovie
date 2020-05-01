import { InsertResult } from "typeorm/query-builder/result/InsertResult";

const repositoryMock = {
  create: jest.fn((data: any) => data),
  save: jest.fn((data: any) => data),
  find: jest.fn(),
  findOne: jest.fn((..._: any): any => undefined),
  update: jest.fn((..._: any): any => undefined),
  delete: jest.fn((..._: any): any => "deleted"),
  createQueryBuilder: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  into: jest.fn().mockReturnThis(),
  values: jest.fn().mockReturnThis(),
  onConflict: jest.fn().mockReturnThis(),
  setParameter: jest.fn().mockReturnThis(),
  returning: jest.fn().mockReturnThis(),
  execute: jest.fn((..._: any): Partial<InsertResult> => ({})),
  findAndCount: jest.fn().mockReturnThis()
};

const queryRunnerMock = {
  manager: {
    transaction: jest.fn()
  }
};

const connectionMock = {
  createQueryRunner: jest.fn(() => queryRunnerMock)
};

export { repositoryMock, connectionMock, queryRunnerMock };
