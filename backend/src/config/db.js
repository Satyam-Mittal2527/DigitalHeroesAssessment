// Database configuration
const dbConfig = {
  uri: process.env.DATABASE_URL || "mongodb://localhost:27017/digitalheroes",
};

module.exports = dbConfig;
