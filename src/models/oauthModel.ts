// src/models/oauthModel.ts

interface Client {
    id: string;
    grants: string[];
}

interface Token {
    accessToken: string;
    client: Client;
    user: { id: string };
    accessTokenExpiresAt: Date;
    scope: string | string[];
}

const tokens: Token[] = []; // Example in-memory token store

const oauthModel = {
    // Method to validate client credentials
    getClient: async (clientId: string, clientSecret: string) => {
        if (clientId === process.env.CLIENT_ID && clientSecret === process.env.CLIENT_SECRET) {
            return { id: clientId, grants: ['password'] };
        }
        return null;
    },

    // Method to generate access token and save it
    saveToken: async (token: any, client: any, user: any) => {
        const accessToken: Token = {
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            client: { id: client.clientId, grants: ['password'] },
            user: { id: user.id },
            scope: token.scope,
        };

        tokens.push(accessToken); // Save token in memory (replace with DB storage)
        return accessToken;
    },

    // Method to retrieve access token details
    getAccessToken: async (accessToken: string) => {
        const token = tokens.find(t => t.accessToken === accessToken);
        if (!token) return null;
        return {
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            client: token.client,
            user: token.user,
            scope: token.scope,
        };
    },

    // Method to validate user credentials
    getUser: async (username: string, password: string) => {
        // Replace with actual user validation (DB check)
        if (username === 'testuser' && password === 'testpassword') {
            return { id: 'user-id' };
        }
        return null;
    },

    // Method to verify access token scopes
    verifyScope: async (token: any, scope: string | string[]) => {
        if (!token.scope) {
            return false;
        }
        const requestedScopes = Array.isArray(scope) ? scope : scope.split(' ');
        const authorizedScopes = Array.isArray(token.scope) ? token.scope : token.scope.split(' ');
        return requestedScopes.every(s => authorizedScopes.includes(s));
    },
};

export default oauthModel;