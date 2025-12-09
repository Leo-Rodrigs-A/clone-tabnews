import pg from "pg";

const { Pool } = pg;

const isDev = process.env.NODE_ENV === "development"; //se for desenvolvimento coloca true na variavel
const pgCa = process.env.POSTGRES_CA;

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  max: 10,
  ssl: getSSLValues(),
});

pool.on("error", (err) => {
  console.log("erro inesperado na pool", err);
});

async function query(queryObject) {
  return pool.query(queryObject);
}

export default { query };

function getSSLValues() {
  if (pgCa) {
    return {
      ca: pgCa,
    };
  }
  return isDev ? false : true;
}
