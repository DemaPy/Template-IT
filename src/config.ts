type MODES = {
  1: "production";
  0: "development";
};

export const MODE: keyof MODES = 1;
export const PRODUCTION = "https://server-68b46mgi3-demas-projects.vercel.app/";
export const DEVELOPMENT = "http://localhost:7777";
export const BASE_URL = MODE ? PRODUCTION : DEVELOPMENT;
