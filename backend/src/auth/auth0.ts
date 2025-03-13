import dotenv from 'dotenv'

dotenv.config({ path: '../.env' });



import { auth } from "express-openid-connect";
import { NextFunction, Request, Response } from "express";
import databaseClient from "../utils/DatabaseClient.js";

const {
    AUTH0_SECRET,
    AUTH0_BASEURL,
    AUTH0_CLIENTID,
    AUTH0_ISSUERBASE
} = process.env;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: AUTH0_SECRET,
    baseURL: AUTH0_BASEURL,
    clientID: AUTH0_CLIENTID,
    issuerBaseURL: AUTH0_ISSUERBASE,
    routes:{
	            callback: '/api/callback',
		            login: '/api/login',
			            logout: '/api/logout',
    }
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

