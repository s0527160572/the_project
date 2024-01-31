import jwt from "jsonwebtoken";
export const auth = async (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token)
        return res.status(401).send("user not authorized" );
    try {
        const decoded = jwt.verify(token, process.env.JWT_STRING);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).send(  "user not authorized" +err.message);
    }
}
export const authAdmin = async (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token)
    return res.status(401).send("user not authorized" );
    try {
        const decoded = jwt.verify(token, process.env.JWT_STRING);
        req.user = decoded;
        if (decoded.role == "admin")
            next();
        else
            return res.status(403).send("You are an unauthorized user to perform this action" )
    }
    catch (err) {
         res.status(401).send("user not authorized"+err.message );
    }
}
