import mysql from "mysql2/promise";

// Global singleton to prevent creating multiple pools during dev hot-reloads
declare global {
  var mysqlPool: mysql.Pool | undefined;
}

const pool =
  global.mysqlPool ??
  mysql.createPool({
    host: process.env.MYSQL_HOST, // e.g. 'localhost'
    user: process.env.MYSQL_USER, // e.g. 'root'
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

if (process.env.NODE_ENV !== "production") {
  global.mysqlPool = pool;
}

export default pool;
