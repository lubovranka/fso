const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const loginRouter = require("./controllers/login");
const usersRouter = require('./controllers/users')
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor)
app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
