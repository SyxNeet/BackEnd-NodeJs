import express from 'express'

// static ở đây nghĩa là : ví dụ khi muốn lấy ảnh ở trên server => nói cho 
// server biết phải lấy từ thư mục public
let configViewEngine = (app) => {
    app.use(express.static("./src/public"))
    app.set("view engine", "ejs") // để nodejs hiểu ta dùng view engine có tên là ejs ( ejs là thư viện )
    // set đường link để lấy view-engine này => tìm các file ejs trong thư mục views
    app.set("views", "./src/views")
}


//để các file js khác có thể sử dụng đc function này => module.export
module.exports = configViewEngine