import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { json, urlencoded } from 'body-parser';
import routes from './routes';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

// Setup routes
routes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`OAuth server is running on port ${PORT}`);
});