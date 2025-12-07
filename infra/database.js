import pg from "pg";

const { Pool } = pg;

const isProd = process.env.NODE_ENV === "production"; //se for produção ele sinaliza como ambiente de produção

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  max: 10,
  ssl: isProd
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

pool.on("error", (err) => {
  console.log("erro inesperado na pool", err);
});

async function query(queryObject) {
  return pool.query(queryObject);
}

export default { query };
