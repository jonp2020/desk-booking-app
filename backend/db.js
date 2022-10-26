const mongoose = require("mongoose");

const connect_db = async () => {

    try {

        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database Connected on ${connect.connection.host}`);

    } catch (error) {

        console.log(`Error Found -> ${error}`);
        process.exit(1);

    }

};

module.exports = connect_db;