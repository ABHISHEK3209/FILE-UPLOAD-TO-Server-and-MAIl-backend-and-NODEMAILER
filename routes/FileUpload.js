

const express=require("express");
const router=express.Router();

const {localFileUpload,ImageUploader,videoUpload,i, imageSizeReducer}=require("../controllers/fileUpload");

//api route
router.post("/localFileUpload",localFileUpload);
router.post("/imageUpload",ImageUploader);
router.post("/imageSizeReducer",imageSizeReducer);
router.post("/videoUpload",videoUpload);

module.exports=router;