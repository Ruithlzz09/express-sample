const express = require("express");
const http = require("http");
const server = require("./server");

const { PORT, APP_NAME, IS_TESTING } = require("./config");

const app = express();
app.set("port", PORT);
app.set("trust proxy", true);
app.disable("etag").disable("x-powered-by");

app.use(express.urlencoded({ extended: false }));
app.use((_, res, next) => {
  res.header("X-XSS-Protection", "1; mode=block");
  res.header("Cache-Control", "no-store");
  res.header("Pragma", "no-cache");
  next();
});

app.use(express.json());
const httpserver = http.createServer(app);
server(app);

httpserver
  .listen(PORT, () => {
    console.log(`${APP_NAME} app is listening to port ${PORT}`);
  })
  .on("error", (err) => {
    console.log(`Error: ${err.stack || err}`);
    process.exit(1);
  });

//Optional in case running development PoC
process.on("uncaughtException", async (err) => {
  console.log(`There was an uncaught error: => ${err.message}`);
  process.exit(1);
});

process.on("unhandledRejection", async (reason, p) => {
  console.log(
    `Unhandled Rejection at: ${JSON.stringify(p)}, reason:, ${
      reason.stack || reason
    }`
  );
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("Signal Recieved -  SIGINT");
});

process.on("SIGTERM", () => {
  console.log("Signal Received - SIGTERM");
  process.exit(0);
});

module.exports = app;
