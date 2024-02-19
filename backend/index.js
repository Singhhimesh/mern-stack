import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoute from './routes/posts/index.js';

const app = express();

app.use(cors({
    origin: '*',
}));

mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.4");

app.use('/api', postRoute);
app.use(express.static(path.join(import.meta.url, 'public')));

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
