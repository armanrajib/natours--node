import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });
// console.log(process.env);

import app from './app.js';

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
