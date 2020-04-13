export const tokenServiceMock = {
  generateTokens: jest.fn(),
  verifyAccessToken: jest.fn(),
  verifyRefreshToken: jest.fn(),
  verifyEmailToken: jest.fn()
};
