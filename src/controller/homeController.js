import db from "../models/index"
import createNewUser from "../services/CRUDService";

const getHomePage = async (req, res) => {
    try {

    } catch (e) {
        console.log(e);
    }
    let data = await db.User.findAll()
    return res.render('homePage.ejs', { data: JSON.stringify(data) })
}

const getCRUD = (req, res) => {
    return res.render("crud.ejs")
}
const postCRUD = async (req, res) => {
    const message = await createNewUser(req.body)
    console.log(message);
    return res.send('post crud from server')
}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD
}