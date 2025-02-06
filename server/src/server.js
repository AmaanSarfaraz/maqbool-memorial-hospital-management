import dotenv from 'dotenv';
import connectDB from './config/DB.js';
import { app } from './app.js';

dotenv.config({
    path: "./.env"
})


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server Listening On Port :  ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.error(`Error while listening on port ${process.env.PORT}`, err);
    })

