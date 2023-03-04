import admin from "./firebase-service";
import * as Express from "express";

interface IRequest extends Express.Request {
    [key: string]: any;
}

const getAuthToken = (req: IRequest, _: any, next: any) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        req.authToken = req.headers.authorization.split(" ")[1];
    } else {
        req.authToken = null;
    }
    next();
};

export const checkIfAuthenticated = (
    req: IRequest,
    res: Express.Response,
    next: any
) => {
    getAuthToken(req, res, async () => {
        try {
            console.log(req.authToken);

            const { authToken } = req;
            const userInfo = await admin.auth().verifyIdToken(authToken);
            console.log(userInfo);

            req.authId = userInfo.uid;
            return next();
        } catch (error) {
            return res.status(401).send({ error: "You are not Authorized" });
        }
    });
};
