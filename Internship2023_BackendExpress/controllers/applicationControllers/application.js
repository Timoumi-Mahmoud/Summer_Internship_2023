const CustomAPIError=require('../../errors/custom-error')
const registrationService= require('../../services/registrationService')
const activateAccountService= require('../../services/emailService/activateAccountService')
const applicationSchema =require('../../modeles/application')
const cloudinary = require('../../utils/cloudinaryConfig');
const upload = require("../../utils/multer");
const sql=require('../../db/mysqlConnect');
const applicationService=require('../../services/applicationService/applicationService')
const studentAdditionalInfoSchema=require('../../modeles/studentAdditionalInfo');
const { MOVED_TEMPORARILY } = require('http-status-codes');


var studentInMysql

const getStudentInfoBasedOnIdentifier= async(req, res) => {
  const  identifier=req.query.identifier
  sql.query(`SELECT * FROM students WHERE identifier = '${identifier}'`,
     async function  (error, results, fields) {
          if (error || results.length===0){
            console.log('error here\n ')
          //throw error;
        res.status(500).json({msg:'this identifier doesnt exist'});

          } 
         studentInMysql=results
if(studentInMysql.length!==0){
  await    studentAdditionalInfoSchema.updateOne(
    { identifier:studentInMysql[0].identifier },
    { $setOnInsert: {   
        identifier:studentInMysql[0].identifier,  
        GradeBac:studentInMysql[0].GradeBac,
        GradeFirstYear:studentInMysql[0].GradeFirstYear,
        GradeSecondYear:studentInMysql[0].GradeSecondYear,
        GradeThirdYear:studentInMysql[0].GradeThirdYear,
        BacGrade:studentInMysql[0].BacGrade, } },
    { upsert: true,new: true }
);
res.status(200).json(results);

}
     
      });


};

const submitApplication=async (req,res)=>{
  const currentClass=req.query.currentClass;
  const identifierWithQuotes=req.query.identifier
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
        var noQuotes= identifierWithQuotes.replace(/['"]+/g, '')
        const additionalInfoFromStudentInfoCollection= applicationService.getAddtionalDataID(noQuotes)
        const temp=await additionalInfoFromStudentInfoCollection


    let newApp= new applicationSchema({
                studentAdditionalInfo: temp,   
                currentClass:req.query.currentClass,
                englishLevel:req.query.englishLevel,
                user:req.query.studentID,
                studentBirthDate:req.query.studentBirthDate,
                mailAddress:req.query.mailAddress,
                applicationFile:result.secure_url,
                cloudinary_id:result.public_id,
                offer:req.query.offerID
              })
            await newApp.save();
    
          res.status(200).json({msg:'okkkk',newApp })
    } catch (error) {
      console.log(error)
    }
}

const getAllApplicationOfAStudent=async(req,res)=>{
  const iduser =req.params.idUser
   try {
     const offers= await applicationService.findAllApplicationOfAstudent(iduser)
     res.status(200).json(offers)
   } catch (error) {
     console.log(error)
   }
 }

 const deleteAnApplication=async(req,res)=>{
  const idApplication=req.params.idApplication
  try {
    const application=await applicationService.deleteApplication(idApplication)
    res.status(202).json(application)
  } catch (error) {
    throw new CustomAPIError('some error occured while trying to delete an application', 400)
    
  }
 }





module.exports={ getStudentInfoBasedOnIdentifier, submitApplication, getAllApplicationOfAStudent}
