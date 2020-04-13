const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://user:user@cluster0-ujgb0.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
);
