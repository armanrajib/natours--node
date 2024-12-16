import express from 'express';
import morgan from 'morgan';

import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

// MIDDLEWARE 1 (THIRD-PARTY)
console.log(process.env.NODE_ENV); // why undefined? --> Have to look again
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
