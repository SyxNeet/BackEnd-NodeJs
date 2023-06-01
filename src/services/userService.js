import bcrypt from 'bcrypt'
import db from "../models/index"

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                // user already exist => compare password
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['roleId', 'password', 'email'],
                    raw: true
                })
                if (user) {
                    let check = await bcrypt.compare(password, user.password)
                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = "ok"
                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.errMessage = "Wrong Password!"
                    }

                } else {
                    userData.errCode = 2
                    userData.errMessage = `User is not found`
                }

            } else {
                userData.errCode = 1
                userData.errMessage = `Email is not exist!`

            }
            console.log("userData :", userData);
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail } // check email db với userEmail truyền vào
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = (userId) => {
    console.log("userId : ", userId);
    return new Promise(async (resovle, reject) => {
        try {
            let users = ''
            if (userId === "ALL") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }

            if (userId && userId !== "ALL") {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resovle(users)
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers
}