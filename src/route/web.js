// MỖi lần truy cập vào đường link của website thì sẽ chạy vào file này đầu tiên
import homeController from '../controller/homeController'
import userController from '../controller/userController'

const express = require('express')
let router = express.Router()

// truyền ứng dụng của server vào hàm này
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage) // gọi -> file homController và gọi đến hàm getHomePage
    router.get('/crud', homeController.getCRUD) // gọi -> file homController và gọi đến hàm getHomePage
    router.post('/post-crud', homeController.postCRUD) // gọi -> file homController và gọi đến hàm getHomePage
    router.get('/get-crud', homeController.displayGetCRUD)
    router.get('/edit-crud', homeController.getEditCRUD)
    router.post('/update-crud', homeController.putCRUD)
    router.post('/delete-crud', homeController.deleteCRUD)


    router.post('/api/login', userController.handleLogin)

    return app.use(router) // tham số đầu tiên là api
}

module.exports = initWebRoutes