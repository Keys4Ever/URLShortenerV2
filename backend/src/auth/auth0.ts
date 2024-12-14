import { auth } from "express-openid-connect";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import databaseClient from "../utils/DatabaseClient.js";

dotenv.config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASEURL,
    clientID: process.env.AUTH0_CLIENTID,
    issuerBaseURL: process.env.AUTH0_ISSUERBASE,
};

const authMiddleware = auth(config);

const checkUserInDatabase = async (req: Request, _res: Response, next: NextFunction) => {
    if (req.oidc && req.oidc.user) {
        console.log(req.oidc.user);
        const { email, sub, nickname, picture } = req.oidc.user;
        const [_provider, provider_id] = sub.split("|");

        try {
            const { rows: existingUser } = await databaseClient.execute("SELECT * FROM users WHERE user_id = $1", [provider_id]);

            if (!existingUser.length) {
                await databaseClient.execute("INSERT INTO users (email, user_id, username, profile_picture) VALUES ($1, $2, $3, $4)", [email, provider_id, nickname, picture]);
                console.log("New OAuth user inserted into database");
            } else {
                console.log("OAuth user already exists in the database");
            }
        } catch (error) {
            console.error(
                "Error checking or inserting user into the database:",
                error
            );
        }
    }
    next();
};

export { authMiddleware, checkUserInDatabase };