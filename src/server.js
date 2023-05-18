import express from 'express'
import bodyParser from 'body-parser' // hỗ trợ lấy tham số (body,param)
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
require("dotenv").config() // dòng này giúp chạy được dòng 17(proscess.env)

const app = express()

//config app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoutes(app)

let port = process.env.PORT || 6969 // lấy tham số port trong .env
app.listen(port, () => {
    //khi chạy thành công => trả ra callback
    console.log("backed NodeJs is running on PORT :" + port);
})