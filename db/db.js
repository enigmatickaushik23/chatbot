const mongoose = require("mongoose");
const dburi ={}

mongoose.connect(dburi, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
  dbName: "user",
}).then(()=>console.log("mongodb connected"));