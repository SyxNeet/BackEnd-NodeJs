// tương tác với db
import db from "../models/index"
const bcrypt = require('bcrypt')

const createNewUser = async (data) => {
    return new Promise(async (resole, reject) => {

        try {
            const { password } = data
            const hashPassword = await bcrypt.hash(password, 10)
            await db.User.create({
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleId
            })

            resole('successfull')
        } catch (ex) {
            reject(ex)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resole, reject) => {
        try {
            let users = db.User.findAll()
            resole(users)
        } catch (e) {
            reject(e)
        }
    })
}


const getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: userId } })

            if (user) {
                resolve(user)
            } else {
                resolve([])
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateInforUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({ where: { id: data.id } })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address

                await user.save()
                resolve()
            } else {
                resolve()
            }
        } catch (e) {
            reject(e)
        }
    })
}
const deleteUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({ where: { id: id } })
            if (user) {
                await user.destroy()
            }
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateInforUser: updateInforUser,
    deleteUserById: deleteUserById
}