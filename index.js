import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import router from './routes/router.js';
import { DB_URL, PORT } from './constants.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/authorize', router);

async function startServer() {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => console.log('Server is running on port ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

startServer();
