const db = require("./db/db");
// const env = require("./")
const express = require("express");
const cors = require("cors");
const path = require("path");
// const socket = require("socket.io");
const PORT = 8080
const dotenv = require("dotenv");

const app = express();

app.use(cors())
dotenv.config();
// app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// io.on('connection', (socket)=> {
//     console.log('Socket Connected Successfully')
// });
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

app.use('/', indexRouter),
app.use('/users', usersRouter)

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  });
  

app.listen(PORT, ()=>console.log(`Running on port ${PORT}`))

module.exports = app
