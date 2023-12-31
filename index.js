import express from 'express';
import dotenv from 'dotenv';
import nearbyGymsRoutes from './Router/nearbyGymsrouter.js';
import cors from 'cors'
import morgan from 'morgan';
import dbConnect from './dbConnect.js';
import authRouter from './Router/authrouter.js';
import getDataRouter from './Router/getdatarouter.js';
import cookieParser from 'cookie-parser';
import storeRoutes from './Router/storeRouter.js';

const app = express();
dotenv.config('./.env');

app.use(express.json());
app.use(morgan('common'));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));

app.use('/auth', authRouter);
app.use('/getdata', getDataRouter);
app.use('/services', nearbyGymsRoutes);
app.use('/services', storeRoutes);

app.get('/', (req, res) => {
    res.status(200).send("Hello from server")
})

dbConnect();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("listening to port : ", PORT);
})

