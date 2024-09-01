import { Request, Response } from 'express';
import OAuth2Server, { Request as OAuthRequest, Response as OAuthResponse } from 'oauth2-server';
import oauthModel from '../models/oauthModel';

const oauth = new OAuth2Server({
    model: oauthModel,
    accessTokenLifetime: 3600,
    allowBearerTokensInQueryString: true,
});

export const token = (req: Request, res: Response) => {
    const request = new OAuthRequest(req);
    const response = new OAuthResponse(res);

    oauth
        .token(request, response)
        .then((token: any) => res.json(token))
        .catch((err: { code: any; }) => res.status(err.code || 500).json(err));
};

export const success = (req: Request, res: Response) => {
    res.json({ message: 'Success! You are authorized.' });
};

export const unauth = (req: Request, res: Response) => {
    res.status(401).json({ error: 'Unauthorized access. No valid token provided.' });
};