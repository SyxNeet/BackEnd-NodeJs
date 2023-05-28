import db from "../models/index"
import CRUDService from "../services/CRUDService";

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
    const message = await CRUDService.createNewUser(req.body)
    return res.send('post crud from server')
}

const displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()


    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}
const getEditCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId)
        return res.render('editCRUD', { user: userData })
    } else {
        return res.send("test")
    }
}

const putCRUD = async (req, res) => {
    const data = req.body
    await CRUDService.updateInforUser(data)
    return res.send("done")
}
const deleteCRUD = async (req, res) => {
    const id = req.query.id
    await CRUDService.deleteUserById(id)
    return res.send("delete done")
}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,

}