import database from "infra/database.js";

const updatedAt = new Date().toISOString();

async function status(request, response) {
  const databaseName = process.env.POSTGRES_DB;
  const dbVersion = await database.query("SHOW server_version;");
  const dbMaxConnections = await database.query("SHOW max_connections;");
  const dbActiveConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  //"SELECT count(*) FROM pg_stat_activity WHERE datname = 'local_db';",

  response.status(200).json({
    status: "ok",
    updated_at: updatedAt,
    dependencies: {
      database: {
        postgres_version: dbVersion.rows[0].server_version,
        max_connections: parseInt(dbMaxConnections.rows[0].max_connections),
        active_connections: parseInt(dbActiveConnections.rows[0].count),
      },
    },
  });
}

export default status;
