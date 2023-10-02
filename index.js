import express from 'express';
import dotenv from 'dotenv';
import nearbyGymsRoutes from './routes/nearbyGyms.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config('./.env');

app.get('/',(req,res)=>{
    res.status(200).send("Hello from server")
})

app.use(nearbyGymsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("listening to port : ",PORT);
});