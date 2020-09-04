import { isValid } from '../auth/auth';

export const handleToken = (token: string, next: (error?: string) => any) => {
    const { valid, error } = isValid(token);
    if (valid) {
        return next();
    }
    console.log(`While connecting user with token: ${token} an error was caught: ${error}`);
    return next(error);
}
