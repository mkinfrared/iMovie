import { AuthDto } from "./dto/auth.dto";

const authServiceMock = {
  loginUser: jest.fn()
};
const authDtoMock: AuthDto = {
  username: "Towelie",
  password: "Marklar"
};

export { authServiceMock, authDtoMock };
