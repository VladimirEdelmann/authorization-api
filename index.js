import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import router from './routes/router.js';

const PORT = 5000;

const DB_URL = `mongodb+srv://vladimiredelmann:gotsanN123J@cluster0.sgnzh67.mongodb.net/?retryWrites=true&w=majority`;

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
