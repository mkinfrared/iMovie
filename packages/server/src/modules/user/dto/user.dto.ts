class UserDto {
  username: string;

  password: string;

  passwordConfirm: string;

  email: string;

  firstName?: string;

  lastName?: string;
}

class UpdateUserDto {
  username?: string;

  email?: string;

  firstName?: string;

  lastName?: string;
}

export { UserDto, UpdateUserDto };
