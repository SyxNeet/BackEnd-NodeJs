import userService from '../services/userService'
const handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password


    if (!email || !password) {
        return res.status(500).json({
            errcode: 1,
            message: " Missing inputs params"
        })
    }

    let userData = await userService.handleUserLogin(email, password)

    // trả ra data dòng 38 login.js(react)
    return res.status(200).json({
        errcode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

const handleGetAllUsers = async (req, res) => {
    let id = req.body.id //all, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required params",
            users: []
        })
    }
    let users = await userService.getAllUsers(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: "oke",
        users
    })
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers
}