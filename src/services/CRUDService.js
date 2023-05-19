// tương tác với db
import db from "../models/index"
const bcrypt = require('bcrypt')

const createNewUser = async (data) => {
    return new Promise(async (resole, reject) => {

        try {
            const { password } = data
            const hashPassword = await bcrypt.hash(password, 10)
            console.log(hashPassword);

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

module.exports = createNewUser