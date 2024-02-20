import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookies from "../utils/generateToken.js";
export const login = async (req, res) => {
    try {
        const { userName, password } = req.body
        const user = await User.findOne({ userName })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!user, !isPasswordCorrect) {
            return res.status(400).json({
                error: "Invalid username or password"
            })
        }
        generateTokenAndSetCookies(user?._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        })
    } catch (err) {
        console.log('Error in login: ', err.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({
            message: "Logout successfull"
        })
    } catch (err) {
        console.log('Error in logout: ', err.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        // console.log(userName)
        // console.log(req.body)
        if (password != confirmPassword) {
            return res.status(400).json({
                error: "Password don't match"
            })
        }
        const user = await User.findOne({ userName })
        if (user) {
            return res.status(400).json({
                error: "UserName is already exists"
            })
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassWord = await bcrypt.hash(password, salt)

        //https://avatar.iran.liara.run/public

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const newUser = new User({
            fullName,
            userName,
            password: hashPassWord,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })
        if (newUser) {
            //generate jwt token
            generateTokenAndSetCookies(newUser._id, res)
            await newUser.save();

            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({
                error: "Invalid user data"
            })
        }

    } catch (err) {
        console.log('Error in signup: ', err.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}