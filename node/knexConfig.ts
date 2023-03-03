export const knexConfig = {
  client: "pg",
  connection: {
    host: process.env.URL_DB,
    port: process.env.PORT_DB,
    user: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    ssl: false,
  },
};
