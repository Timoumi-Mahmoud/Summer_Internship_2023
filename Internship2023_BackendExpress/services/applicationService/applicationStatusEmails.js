"use strict";
require("dotenv").config();
const nodemailer = require("nodemailer");
const path = require("path");
const CustomAPIError =require('../../errors/custom-error')
const Offer = require("../../modeles/offer");
const { off } = require("process");

exports.notifyTheStudentByTheStatusOfHisApplication= async (studentMail, status, offer, appliedAt) => {
    const offerInfo=await getTitleOFtheOFfer(offer)
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
        to:  studentMail, // list of receivers
        subject: "Notifcation of application ", // Subject line
        text: '', // plain text body
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <style type="text/css">
                @media screen {
                    @font-face {
                        font-family: 'Lato';
                        font-style: normal;
                        font-weight: 400;
                        src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: normal;
                        font-weight: 700;
                        src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: italic;
                        font-weight: 400;
                        src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: italic;
                        font-weight: 700;
                        src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                    }
                }
        
                /* CLIENT-SPECIFIC STYLES */
                body,
                table,
                td,
                a {
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
        
                table,
                td {
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
        
                img {
                    -ms-interpolation-mode: bicubic;
                }
        
                /* RESET STYLES */
                img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                }
        
                table {
                    border-collapse: collapse !important;
                }
        
                body {
                    height: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100% !important;
                }
        
                /* iOS BLUE LINKS */
                a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: inherit !important;
                    font-family: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                }
        
                /* MOBILE STYLES */
                @media screen and (max-width:600px) {
                    h1 {
                        font-size: 32px !important;
                        line-height: 32px !important;
                    }
                }
        
                /* ANDROID CENTER FIX */
                div[style*="margin: 16px 0;"] {
                    margin: 0 !important;
                }
            </style>
        </head>
        
        <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
           
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="#FFA73B" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                
                                  <img width="64" height="120" src="https://img.icons8.com/pastel-glyph/64/notification-mail--v2.png" alt="notification-mail--v2"/>
                                
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">
                                      Your application to the offer:<strong> `+offerInfo.universityName+`  </strong>that you have applied to at `+appliedAt+`  have been saved successfully into our database  </p>
                                  
                                  <p>Based on your score that have been calculated automatically, our initial response is: `+status+`. 
                                      
                                           </td>
                            </tr>
                          <td  style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 400; line-height: 25px;">
                            <p><mark> This is an automated response </mark>, Your application will be reviewed once more  later by one of our administration  personal to fully confirm it.</s>
                          </td>
                            <tr>
                       
                            </tr> <!-- COPY -->
             
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: monospace, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px; color:purple; text-align:center">
                                    <p style="margin: 0;  ">Cheers, Timoumi Mahmoud</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">All rights reserved 2023-2024 .</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        
        </body>
        
        </html>`
       });
// html body
      
  
      console.log(`Message sent: ${info.messageId}`);
      return `Message sent: ${info.messageId}`;
    } catch (error) {
      console.error(error);
      throw new Error(
        `Something went wrong in the sendmail method. Error: ${error.message}`
      );
    }
  };








const  getTitleOFtheOFfer=async(offerID)=>{
    const offerTitle= await Offer.findById(offerID ).select('universityName  title')
    console.log("===================================>"+offerTitle)
        console.log("===================================>"+offerTitle.universityName)

    return offerTitle
}


  exports.sendAcceptanceEmail= async (studentMail, decision, offerId) => {

   const titleOffer= await getTitleOFtheOFfer(offerId)
  
    if(decision==='Accepted'){
        var titleOfMail=` <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
         <img width="64" height="64" src="https://img.icons8.com/pastel-glyph/64/applause--v1.png" alt="applause--v1"/>
          Congratulation You Have been accepted </h1>
        `
        var contentOfMail=
                               `   <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
      Hello, 
      We are writing this mail to inform you that your application to the offer <strong>`+titleOffer.universityName + `</strong> has been accepted.
                              </p>`
    }else{
        var titleOfMail=` <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
        <img width="64" height="64" src="https://img.icons8.com/pastel-glyph/64/refuse.png" alt="refuse"/>
         Sorry Your application has been retain  </h1>
       `
       var contentOfMail=`   <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
       Dear {{student name}}, 
      We are writing this mail to inform you that your application to the offer <strong>` + titleOffer.universityName+`</strong>has been put into the waiting list.
      It is true that your score meet the required score setup by the university , but we have the constraint of number of places so we rank all application .
       For now We will retain your application in our Database in case there is a free place in the future.
                              </p>
                              <br>
                              <p>We highly recomand checking the other offers</p>
                              `
    }
    
    
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
            to:  studentMail, // list of receivers
            subject: "Application Final Result", // Subject line
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
                                                `+ titleOfMail+ `
                                                    <span
                                                        style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                  `+contentOfMail+`
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
    // html body
          
      
          console.log(`Message sent: ${info.messageId}`);
          return `Message sent: ${info.messageId}`;
        } catch (error) {
          console.error(error);
          throw new Error(
            `Something went wrong in the sendmail method. Error: ${error.message}`
          );
        }
      };
    


    const offerInfoFromDb=async(offerId)=>{
      const offer=   await offerShema.findById({offerId})
      console.log("in the function :====>",offer);
      return offer;
    }