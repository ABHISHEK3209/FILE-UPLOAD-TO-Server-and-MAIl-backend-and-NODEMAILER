const express =  require('express');
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;
 

//middleware
app.use(express.json());
// const cookieParser= require("cookie-parser");
// app.use(cookieParser());
const fileUpload=require("express-fileupload");
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

const db=require("./config/database");
db.connect();
 
//cloud se connect karna h
const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();



// route import and mount 
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload",Upload);

// Activate 
app.listen(PORT,() => {
    console.log(`App is ruuning at ${PORT}`);
})

app.get("/", (req,res) => {
    res.send("<h1>Auth App</h1>")
})