const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    port: process.env.PORT || 3000,
    dbURL: "mongodb://localhost:27017/friendlyWorld",
    origin: ["https://findyourdreamcar.000webhostapp.com"],
  },
  production: {
    port: process.env.PORT || 3000,
    dbURL: process.env.DB_URL_CREDENTIALS,
    origin: [],
  },
};

module.exports = config[env];
