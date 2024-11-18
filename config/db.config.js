module.exports = {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "star_d",
    PASSWORD: process.env.DB_PASSWORD || "star_d",
    DB: process.env.DB_NAME || "postgres",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
        timestamps: false,
      }
  };
