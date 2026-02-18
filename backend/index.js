import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './lib/db.js';
import authRoutes from './routes/auth.route.js'
import clubRoutes from './routes/club.route.js'
import clubAdminRoutes from './routes/clubadmin.route.js';
import superAdmin from './controllers/superadmin.controller.js'
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/club", clubRoutes);
app.use("/api/clubadmin", clubAdminRoutes);

app.use("/api/clubs", superAdmin);



app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
