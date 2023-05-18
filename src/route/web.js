// MỖi lần truy cập vào đường link của website thì sẽ chạy vào file này đầu tiên
import homeController from '../controller/homeController'
const express = require('express')
let router = express.Router()

// truyền ứng dụng của server vào hàm này
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage) // gọi -> file homController và gọi đến hàm getHomePage
    return app.use(router) // tham số đầu tiên là api
}

module.exports = initWebRoutes