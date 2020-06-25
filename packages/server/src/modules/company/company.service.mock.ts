/* eslint-disable @typescript-eslint/camelcase */
const companyServiceMock = {
  createMany: jest.fn()
};

const companyResponseMock = {
  description: "",
  headquarters: "Burbank, California, United States",
  homepage: "https://www.warnerbros.com",
  id: 174,
  logo_path: "/6rFNo5taSC9i0Sxnl81nucQMsw9.png",
  name: "Warner Bros. Pictures",
  origin_country: "US",
  parent_company: {
    name: "Warner Bros. Entertainment",
    id: 17,
    logo_path: "/s1y7CTv6YHe87YUGOq6SRB6DmO7.png"
  }
};

export { companyServiceMock, companyResponseMock };
