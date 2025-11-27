import database from "infra/database.js";

async function status(request, response) {
  const dbVersion = await database.query("SHOW server_version;");
  const dbMaxConnections = await database.query("SHOW max_connections;");
  const dbActiveConnections = await database.query(
    "SELECT count(*) FROM pg_stat_activity",
  );

  const updatedAt = new Date().toISOString();
  response.status(200).json({
    status: "ok",
    message: "meu teste é só esse console.log aqui :(",
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
