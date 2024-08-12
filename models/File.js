
const mongoose=require("mongoose");
const nodemailer=require("nodemailer");
require("dotenv").config();


const fileSchema= mongoose.Schema({
    name:{
        type:String,
        requird:true,
    },
    imageUrl:{
        type:String,
        
    },
    tags:{
        type:String,
        
    },
    email:{
        type:String,
       
    },
    

});

//post middleware
 fileSchema.post("save",async function (doc) {
    //doc means jo databse m entry huhhi h ussi ko doc bol rehe h
    try{
  console.log("DOC",doc);
  //transporter
  let transporter= nodemailer.createTransport(
    {
    host:process.env.MAIL_HOST,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
    },  
  });
  //send email
  let info =await transporter.sendMail({
    from:`abhishek email bhej reha h`,
    to: doc.email,
    subject:`new file uploaded to cloudinary`,
    html:`<h2>HELLO JEE </h2><p> Uploaded view:<a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`,
  })


    }
    catch(err){
        console.log(err);
        console.error(err);
    }
     }  
 );



 module.exports=mongoose.model("File",fileSchema);

