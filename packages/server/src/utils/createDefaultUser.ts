/* eslint-disable no-console */
import fs from "fs";
import path from "path";

const createDefaultUser = () => {
  const file = path.resolve(__dirname, "../../user.json");
  const data = fs.readFileSync(file, { encoding: "utf8" });

  return JSON.parse(data);
};

export default createDefaultUser;
