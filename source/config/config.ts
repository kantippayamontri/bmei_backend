const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const SORT_ASC = 'SORT_ASC'
const SORT_DESC = 'SORT_DESC'

const config = {
  SERVER: SERVER,
  SORT_ASC:SORT_ASC,
  SORT_DESC:SORT_DESC

};

export default config;