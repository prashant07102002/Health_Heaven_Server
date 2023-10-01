const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config('./.env');
const mongooseUri = process.env.MONGOOSE_URL
module.exports = () => {
    try {
        mongoose.connect(mongooseUri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        ).then(console.log("MongoDB Connected"));
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};