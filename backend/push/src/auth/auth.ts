import { env } from '../../env';

export function getUserIdFromToken(token: string) {
    var jwt = require('jsonwebtoken');
    const decoded = jwt.decode(token, env.app.tokenSecret);
    return { id: decoded.sub };
}

export function isValid(token: string) {
    var jwt = require('jsonwebtoken');
    const data = jwt.decode(token, env.app.tokenSecret);
    if (data.exp < (new Date().getTime() / 1000)) {
        return { valid: false, error: 'Token expiration date is expired' };
    }
    return { valid: true };
}
