const createUsers = `
CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  is_Admin INTEGER NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL
);
`

module.exports = createUsers
