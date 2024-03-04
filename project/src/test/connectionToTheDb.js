import mysql from "mysql2/promise";

async function ConnectionTotheDatabase() {
  const connection = await mysql.createConnection({
    host: "localhost",
    port: "6033",
    user: "root",
    password: "root",
    database: "db_products",
  });

  try {
    connection.connect();
  } catch (err) {
    return err;
  }
}
