const express = require("express")
const app = express()

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use("/api/users", require("./routes/users"));
app.use("/api/reservations", require("./routes/reservations"));

module.exports = app;