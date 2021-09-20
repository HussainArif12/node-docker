const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
const cors = require("cors");
let RedisStore = require("connect-redis")(session);

const port = process.env.PORT;
let redisClient = redis.createClient({
  host: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
});

const postRoutes = require("./postRoutes");
const userRouter = require("./userRoutes");

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUnitialized: false,
      httpOnly: true,
      maxAge: 60 * 1000,
    },
  })
);
app.use(express.json());
const connectWithRetry = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("db connected, "))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();
app.enable("trust proxy");
app.use(cors({}));
app.use("/posts", postRoutes);
app.use("/api/v1/users", userRouter);
app.get("/", (req, res) => {
  console.log("Yeah it an");
  res.send("<h1> Roha Afaq </h1>");
});

app.listen(port, () => console.log("Running on port " + port));
