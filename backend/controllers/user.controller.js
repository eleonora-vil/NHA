import User from "../models/user.model.js"

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.User._id

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log('Error in getUsersForSidebar: ', err.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}