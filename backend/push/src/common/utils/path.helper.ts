import { join } from 'path';

export function getOsEnv(key: string): string {
    return process.env[key] as string;
}

export function getPath(path: string): string {
    return join(process.cwd(), path);
}

export function getPaths(paths: string[]): string[] {
    return paths.map(p => getPath(p));
}

export function getOsEnvArray(key: string, delimiter: string = ','): string[] {
    return (process.env[key] && process.env[key].split(delimiter)) || [];
}

export function getOsPaths(key: string): string[] {
    return getPaths(getOsEnvArray(key));
}
