"use strict";
require("dotenv").config();
const nodemailer = require("nodemailer");
const path = require("path");
const userSchema = require('../../modeles/user');
const CustomAPIError =require('../../errors/custom-error')


exports.setForgetPasswordTokenProperty=async(userId, resetPwdToken)=>{
    await userSchema.
    findOneAndUpdate({_id:userId},
   {resetPassword:  resetPwdToken   })

}



exports.findPasswordToken= async (pwdResetToken)=>{
   try {
    const user= await  userSchema.findOne({resetPassword: pwdResetToken});
    return user
   } catch (error) {
    console.log(error)
    
   }
}


exports.sendForgetPasswordToken = async (reciverAddress, resetPwdToken) => {
let url ='http://localhost:4200/changePassword?token='+resetPwdToken+'&password='
    try {
      // Create a transporter
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });
  
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: process.env.USER, // sender address
        to:  reciverAddress, // list of receivers
        subject: "Reset Password ", // Subject line
        text: '', // plain text body
        html: `
        </body>
        </html>
        <!doctype html>
                        <html lang="en-US">
        
                    <head>
                        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                        <title>Notification Email about the result of your application</title>
                        <meta name="description" content="Reset Password Email Template.">
                        <style type="text/css">
                            a:hover {text-decoration: underline !important;}
                        </style>
                    </head>
        
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                            style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                            <tr>
                                <td style="height:40px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="padding:0 35px;">
                                    <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                        requested to reset your password</h1>
                                    <span
                                        style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                    <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                        We cannot simply send you your old password. A unique link to reset your
                                        password has been generated for you. To reset your password, click the
                                        following link and follow the instructions.
                                    </p>
                                    <a target="_blank" rel="noopener noreferrer" href=${url}
                                        style="background:#e2b654;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">change my password</a>
                                </td>
                            </tr>
                                         <tr>
                                            <td style="height:10px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                  <br>
                                  
                                      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: monospace, sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                       
                                      <tr>
                                            <td style="height:10px;">&nbsp;</td>
                                        </tr>
                           
                                        <tr>
                                        <td >
                                            <p style="margin: 0px; color:purple ; text-align :center ">Cheers, Timoumi Mahmoud</p>
                                        </td>
                                    </tr>
                                     <tr>
                                            <td style="height:10px;">&nbsp;</td>
                                        </tr>
                                    </table>                          
                                </td>
                            <tr>
                                 <tr>
                            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                            <p style="margin: 0; text-align:left ">All rights reserved 2023-2024 .</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            
        
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->
        </body>
        
        </html>`
       });
      
  
      console.log(`Message sent: ${info.messageId}`);
      return `Message sent: ${info.messageId}`;
    } catch (error) {
      console.error(error);
      throw new Error(
        `Something went wrong in the sendmail method. Error: ${error.message}`
      );
    }
  };

