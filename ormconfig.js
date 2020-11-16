module.exports = {
  "type": "mysql",
  "host": "home.hyunsub.kim",
  "port": process.env.DB_PORT || 3306,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_DATABASE,
  "synchronize": true,
  "logging": ["query", "error"],
  "entities": [
     "src/entity/**/*.ts"
  ]
}