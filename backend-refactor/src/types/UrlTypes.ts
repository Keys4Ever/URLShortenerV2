export interface User {
    userId: string;
    email: string;
    name: string;
    picture: string;
}

export interface Url {
    longUrl: string;
    shortUrl: string;
    tags: Array<{ id: string; name: string; description: string }>;
    description: string;
}

export type CreateUrl = Pick<User, "userId"> & Url;
