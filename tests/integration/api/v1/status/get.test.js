test("GET to /api/v1/status should return 200 ok", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const postgresVersion = responseBody.dependencies.database.postgres_version;
  expect(postgresVersion).toEqual("16.0");
  const postgresMaxConnections =
    responseBody.dependencies.database.max_connections;
  expect(postgresMaxConnections).toEqual(100);
  const openedConnections =
    responseBody.dependencies.database.active_connections;
  expect(openedConnections).toEqual(1);
});
