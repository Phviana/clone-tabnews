import database from 'infra/database.js'

async function status(request, response) {
  const updatedAt = new Date().toISOString()

  const databaseResult = await database.query("SHOW server_version;")
  const databaseVersion = databaseResult.rows[0].server_version

  const databaseResultMaxConnections = await database.query("SHOW max_connections;")
  const max_connections = databaseResultMaxConnections.rows[0].max_connections

  const databaseResultOpenedConnections = await database.query({text: "SELECT Count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [process.env.POSTGRES_DB]
  }
  )
  const openedConnections = databaseResultOpenedConnections.rows[0].count
  
  response.status(200).json({ 
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(max_connections),
        opened_connections: openedConnections
      }
    }
   });
}

export default status;
