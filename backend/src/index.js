import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import session from "express-session";
import initializeDb from "./db";
import middleware from "./middleware";
import api from "./api";
import config from "./config.json";

const RedisStore = require("connect-redis")(session);

const app = express();
app.server = http.createServer(app);

// Routing
// console.log(path.resolve('public'))
console.log(path.resolve(__dirname, "../../frontend/", "dist"));
app.use(express.static(path.resolve(__dirname, "../../frontend/", "dist")));
app.set("views", path.resolve(__dirname, "../../frontend/", "dist"));
// app.set('view engine', 'ejs');
// logger
app.use(morgan("dev"));

// 3rd party middleware
app.use(
  cors({
    exposedHeaders: config.corsHeaders
  })
);

app.use(
  bodyParser.json({
    limit: config.bodyLimit
  })
);

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

app.use(
  session({
    secret: "test",
    store: new RedisStore({
      port: 6379,
      host: "127.0.0.1",
      db: 0,
      pass: "",
      ttl: 30
    }),
    resave: false,
    saveUninitialized: false
  })
);

app.get("/", (req, res) => {
  res.render({ 'index': {} });
});

app.get("/test", (req, res) => {
  req.session.user = {
    name: "jack"
  };
  res.send({ test: "hello world" });
});

// connect to db
initializeDb(db => {
  // internal middleware
  app.use(middleware({ config, db }));

  // api router
  app.use("/api", api({ config, db }));

  app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
  });
});

export default app;
