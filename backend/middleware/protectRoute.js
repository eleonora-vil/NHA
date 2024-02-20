import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import User from '../models/user.model.js';
dotenv.config();
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        // console.log('token: ', token)
        if (!token) {
            res.status(400).json({
                error: "Unauthorized - No Token Provided"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log('decoded: ', decoded)
        if (!decoded) {
            res.status(400).json({
                error: "Unauthorized - Invalid Token"
            })
        }
        const user = await User.findById(decoded.userId).select("password")
        // console.log('user: ', user)

        req.User = user
        next();
    } catch (error) {
        console.log('Error in protectRoute: ', err.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
export default protectRoute
