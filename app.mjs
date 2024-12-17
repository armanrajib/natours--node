import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import tourRouter from './routes/tourRoutes.mjs';
import userRouter from './routes/userRoutes.mjs';

dotenv.config({ path: './config.env' });

const app = express();

// MIDDLEWARE 1 (THIRD-PARTY)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// MIDDLEWARE 2
app.use(express.json());

// MIDDLEWARE 3
app.use(express.static('./public'));

// MIDDLEWARE 4 (CUSTOM)
app.use((req, res, next) => {
    console.log('Hello from the middleware 👋');
    next();
});

// MIDDLEWARE 5 (CUSTOM)
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
