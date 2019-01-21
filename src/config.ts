export const config = {
  db_url: process.env.MONGO_URL,
  db_username: process.env.MONGO_USERNAME,
  db_password: process.env.MONGO_PASSWORD,
  db_database: process.env.MONGO_DB,
  db_host: process.env.MONGO_HOST,
  db_port: +process.env.MONGO_PORT,
  bot_token: process.env.TELEGRAM_TOKEN,
};
