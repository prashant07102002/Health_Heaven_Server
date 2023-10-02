const express = require("express");
const app = express();
app.use(express.json());
const morgan = require("morgan");
app.use(morgan('common'));
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const authRouter = require("./Router/authrouter");
const getdataRouter = require("./Router/getdatarouter");
dotenv.config('./.env');
app.use('/auth', authRouter);
app.use('/getdata', getdataRouter);
app.get('/', (req, res) => {
    res.status(200).send("Hello from server")
})
dbConnect();
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("listening to port : ", PORT);
})

