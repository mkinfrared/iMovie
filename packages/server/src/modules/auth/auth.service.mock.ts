import { AuthDto } from "./dto/auth.dto";

const authServiceMock = {
  loginUser: jest.fn()
};
const authDtoMock: AuthDto = {
  username: "marklar",
  password: "Foobar42@"
};

export { authServiceMock, authDtoMock };
