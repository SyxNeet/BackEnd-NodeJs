import express from 'express'
import bodyParser from 'body-parser' // hỗ trợ lấy tham số (body,param)
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import connectDB from "./config/connectDB"
import cors from 'cors'

require("dotenv").config() // dòng này giúp chạy được dòng 17(proscess.env)

const app = express()
// app.use(cors({ origin: true }))

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//config app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoutes(app)

// connect DB
connectDB()

let port = process.env.PORT || 6969 // lấy tham số port trong .env
app.listen(port, () => {
    //khi chạy thành công => trả ra callback
    console.log("backed NodeJs is running on PORT :" + port);
})