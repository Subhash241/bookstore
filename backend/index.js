import express, { request, response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';


const app = express();

// Midddleware of parsing request 
app.use(express.json());

//Midddleware for handling CORS POLICY
//Option 1 : Allow all origins with default of cors(*)
app.use(cors());

// option 2 : allow custom origins
// app.use(
//     cors({
//         origin : 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT','DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/',(request , response)=>{
    console.log(request);
    return response.status(200).send('welcome to mern tut');
});

app.use('/books',booksRoute)

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });