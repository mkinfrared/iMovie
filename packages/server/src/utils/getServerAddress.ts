import { Request } from "express";

import { SERVER_PORT } from "config/secrets";

const getServerAddress = (request: Request) => {
  const { protocol, hostname } = request;

  if (hostname === "localhost") {
    return `${protocol}://${hostname}:${SERVER_PORT}`;
  }

  return `${protocol}://${hostname}`;
};

export default getServerAddress;
