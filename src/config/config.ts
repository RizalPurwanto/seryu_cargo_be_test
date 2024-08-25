export default (): any => ({
  port: parseInt(process.env.PORT, 10) || 3000,

  db: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,

    port: parseInt(process.env.DB_PORT, 10) || 5432,
  },

  url: {
    backend: process.env.BACKEND_URL,
  },
});
