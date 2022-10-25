const app = require("./app.js")
const dotenv = require("dotenv").config()

const connect_db = require("./db.js")

const port = process.env.PORT || 4000

connect_db();

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})

