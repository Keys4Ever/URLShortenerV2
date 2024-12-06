import { PoolClient } from "pg";

export interface User {
    userId: string;
    email: string;
    name: string;
    picture: string;
}

export interface Url {
    longUrl: string;
    shortUrl?: string;
    urlTags?: Array<{ id: string; name: string; description: string }>;
    description?: string;
}
export interface currentUrl extends Omit<Url, 'urlTags'> {
    id: string | number;
    clicks: number;
    date: string;
    tags: Array<{ id: string; name: string; description: string }>;
}

export interface Tag {
    id: string;
    name: string;
    description: string;
}

export interface UpdateUrlInput {
    currentShortUrl: string;
    currentLongUrl: string;
    newShortUrl?: string;
    newLongUrl?: string;
    tags?: Tag[];
    currentTags?: Tag[];
}

export type UpdateParams = {
    currentLongUrl: string;
    newLongUrl?: string;
    currentShortUrl: string;
    newShortUrl?: string;
    tags?: Tag[];
    currentTags?: Tag[];
};

export type BuildUpdateQueryParams = {
    currentShortUrl: string;
    currentLongUrl: string;
    newShortUrl?: string;
    newLongUrl?: string;
};

export type TagComparisonParams = {
    tags?: Tag[];
    currentTags?: Tag[];
};

export type HandleTagsParams = {
    client: PoolClient;
    addedTags: Tag[];
    removedTags: Tag[];
    url: string;
};

export interface UpdateResponse {
    message?: string;
    error?: string;
}

export type CreateUrl = Pick<User, "userId"> & Url;
