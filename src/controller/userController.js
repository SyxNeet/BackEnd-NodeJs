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


    return res.status(200).json({
        errcode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

module.exports = {
    handleLogin: handleLogin
}