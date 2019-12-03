const mongoose = require('mongoose');

mongoose.connect(
  "mongodb+srv://dbUser2:dbUser2@cluster0-bylh6.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (!err) {
      console.log("MongoDB Connection Succeeded");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

require('./contact.model');