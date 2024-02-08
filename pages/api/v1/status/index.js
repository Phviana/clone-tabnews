import database from 'infra/database.js'

async function status(request, response) {
  const queryResut = await database.query("SELECT 1 + 1;")
  console.log(queryResut.rows)
  response.status(200).json({ valor: "status OK" });
}

export default status;
