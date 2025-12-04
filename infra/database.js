import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  max: 10,
});

console.log("credenciais do postgres", {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
});

pool.on("error", (err) => {
  console.log("erro inesperado na pool", err);
});

async function query(queryObject) {
  return pool.query(queryObject);
}

export default { query };
