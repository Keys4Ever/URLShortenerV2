
export function isValidShortUrl(url: string): boolean {
    const regex = /^[a-zA-Z0-9\-]+$/;
    return regex.test(url);
}