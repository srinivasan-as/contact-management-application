const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database Connected");
        // console.log(connect.connection.host, connect.connection.name);
    }catch(err) {
        // console.log(`This is the error message of connecting DB`)
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;