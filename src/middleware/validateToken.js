import expressAsyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken'

const validateToken = expressAsyncHandler(async (req, res, next) => {
    const auth = req.headers.authorization;
    if (auth && auth.startsWith("Bearer ")) {
        const token = auth.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            console.log(decoded);
            req.user = decoded.user; 
            next(); 
            if(!token){
                res.status(401).json({message: "invalid token"})
            }
        });
    } else {
        res.status(401);
        throw new Error("Token not provided");
    }
});
export default validateToken;