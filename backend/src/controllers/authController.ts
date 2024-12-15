import { Request, Response } from "express";
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' });



const profileController = (req: Request, res: Response) => {
    if (req.oidc.isAuthenticated()) {
        res.json(req.oidc.user);
    } else {
        res.status(401).send("Not logged in");
    }
};

// Get authentication status
const authStatusController = (req: Request, res: Response) => {
    res.json({
        authenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user || null,
    });
};

// Logout user
const logoutController = (_req: Request, res: Response) => {
    res.oidc.logout({
        returnTo: process.env.FRONTEND_URL,
    });
};

// Redirect to login if not authenticated
const loginController = (req: Request, res: Response) => {
    const {whereToRedirect} = req.params;
    if (!req.oidc.isAuthenticated()) {
        whereToRedirect ? res.oidc.login({returnTo: whereToRedirect}) : res.oidc.login();
    } else {
        res.redirect(String(process.env.FRONTEND_URL));
    }
};

export { profileController, authStatusController, logoutController, loginController };
