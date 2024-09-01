import { Express } from 'express';
import { token, success, unauth } from '../controllers/authController';

export default (app: Express) => {
    app.post('/oauth/token', token);
    app.get('/success', success);
    app.get('/unauth', unauth);
};