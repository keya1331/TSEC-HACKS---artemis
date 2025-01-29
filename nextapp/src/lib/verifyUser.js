import jwt from "jsonwebtoken";

export async function verifyUser(token) {
    try{
        const payload = jwt.decode(token, process.env.JWT_SECRET);
        console.log("*",payload)
        const userId = payload.userId || payload.officerId;
        return userId;
    } catch(err){
        console.error("Error while fetching user: ", err);
        throw err;
    }
}