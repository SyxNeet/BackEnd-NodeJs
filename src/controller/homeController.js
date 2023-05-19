import db from "../models/index"


const getHomePage = async (req, res) => {
    try {

    } catch (e) {
        console.log(e);
    }
    let data = await db.User.findAll()
    return res.render('homePage.ejs', { data: JSON.stringify(data) })
}

module.exports = {
    getHomePage: getHomePage
}