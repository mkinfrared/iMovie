import { UpdateUserDto, UserDto } from "modules/user/dto/user.dto";

const userServiceMock = {
  create: jest.fn(),
  getAll: jest.fn(),
  getOne: jest.fn(),
  getByUsername: jest.fn(),
  getByEmail: jest.fn(),
  updateUser: jest.fn(),
  removeUser: jest.fn()
};
const userDtoMock: UserDto = {
  username: "marklar",
  password: "Foobar42@",
  passwordConfirm: "Foobar42@",
  email: "marklar@foo.bar",
  firstName: "Randy",
  lastName: "Marsh"
};
const updateUserDtoMock: UpdateUserDto = {
  username: "marklar",
  email: "marklar@foo.bar",
  firstName: "Randy",
  lastName: "Marsh"
};

export { userServiceMock, userDtoMock, updateUserDtoMock };
