
//all business logic came under controller
const { response } = require("express");
const File=require("../models/File");
const cloudinary=require("cloudinary").v2;

//localfileupload --->handler function 
exports.localFileUpload =async(req,res)=>{
    try{
        //fetch file
        const file=req.files.file;
        //yisfile naam ke objr=ect m ba hut chije hogi
        //like name:,size:,encoding:,truncated:

        //..............
        console.log("file aa gayi->",file);

        let path= __dirname+ "/files" + Date.now() + `.${file.name.split('.')[1]}`;
        ///ye path server k

 //add path to move function
        file.mv(path,(err)=>{
            console.log(err);//passing a callback function if any error occur
        });

       
        res.json({
            success:true,
        
            message:"local file uploaded successsfully",
        });

    }
    catch(err){
        console.log(err);

    }
}

function isFileUploadSupported(type,supportedType)
{
    return supportedType.includes(type);
}
async function uploadFileToCloudinary (file,folder,quality){
    const options ={folder}; 
    if(quality){
        //agar quality ke andar koi value hogi to options m include ho jayegi
        options.quality=quality;
    }
   //ye options ko auto karna hoga
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);

}

///image upload to cloud

exports.ImageUploader=async (req,res)=>{
    try{
        //data fetch
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);
        //validation

        const supportedType=["jpg","jpeg","png"];
        const fileType= file.name.split('.')[1].toLowerCase();
        if(!isFileUploadSupported(fileType,supportedType)){
 return res.json({
    success:false,
    message:"file format not supported",
 });
        }

        //file format supported hai
        //to ab cloudinary par bhej denge

        const response =await uploadFileToCloudinary(file,"Codehelp");
        console.log(response);

 //db m entry kar do
 const fileData=await File.create({
    name,
    tags,
    email,
    imageUrl:response.secure_url,
});

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Successfullly upload ho  gaya ha",
        });
    }
catch(err){
    console.log(err);
    res.status(400).json({
        success:false,
        message:"Something went wrong",
    });
}
}

//video file

exports.videoUpload=async(req,res)=>{
    try{
        //data fetch
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.videoFile;
        console.log(file);
        //validation

        const supportedType=["mp4","mov"];
        const fileType= file.name.split('.')[1].toLowerCase();
        //add a upper limit of 5mb for video
        if(!isFileUploadSupported(fileType,supportedType)){
 return res.status(400).json({
    success:false,
    message:"file format not supported",
 });
        }

        //file format supported hai
        //to ab cloudinary par bhej denge

        const response =await uploadFileToCloudinary(file,"Codehelp");
        console.log(response);

 //db m entry kar do
 const fileData=await File.create({
    name,
    tags,
    email,
    imageUrl:response.secure_url,
});

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"video Successfullly upload ho  gaya ha",
        });
    }
catch(err){
    console.log(err);
    res.status(400).json({
        success:false,
        message:"Something went wrong",
    });
}

}

exports.imageSizeReducer= async(req,res)=>{
    try{
        //data fetch
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);
        //validation

        const supportedType=["jpg","jpeg","png"];
        const fileType= file.name.split('.')[1].toLowerCase();
        if(!isFileUploadSupported(fileType,supportedType)){
 return res.json({
    success:false,
    message:"file format not supported",
 });
        }

        //file format supported hai
        //to ab cloudinary par bhej denge
 //reduce size using quality attribute 
 //reduce using height
        const response =await uploadFileToCloudinary(file,"Codehelp",50);
        console.log(response);

 //db m entry kar do
 const fileData=await File.create({
    name,
    tags,
    email,
    imageUrl:response.secure_url,
});

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Successfullly upload ho  gaya ha",
        });
    }
catch(err){
    console.log(err);
    res.status(400).json({
        success:false,
        message:"Something went wrong",
    });
}
}