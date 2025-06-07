import loadEnv from './config/env.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import connectDB from './config/db.js';
import { logger } from './middleware/logger.middleware.js';
import { cartRouter } from './routes/cart.routes.js';
import { categoryRouter } from './routes/category.routes.js';

loadEnv();
export const app = express();
app.use(logger);
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use('/auth', authRoutes);
app.use('/cart', cartRouter);
app.use('/categories', categoryRouter);


app.get('/', (req, res) => {
    res.send('GameHaven API is running...');
});

const PORT = process.env.PORT || 3000;
connectDB().then(()=> {
    app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
}).catch((err) => console.error(err));
