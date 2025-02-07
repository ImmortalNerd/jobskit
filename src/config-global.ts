/* eslint-disable */
import packageJson from "../package.json";

export const CONFIG = {
  site: {
    name: "JobsKit",
    serverUrl: "https://jobs-kit.com/",
    version: packageJson.version,
  },
  auth: {
    method: "jwt",
    skip: false,
    redirectPath: "/",
  },
};
