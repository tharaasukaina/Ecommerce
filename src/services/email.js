import nodemailer from "nodemailer";

async function SendEmail(dest,subject,message) {
   
    let transporter = nodemailer.createTransport({
     service:'gmail',
      auth: {
        user: process.env.SNDEREMAIL, // generated ethereal user
        pass: process.env.SENDEREMAILPASSWORD, // generated ethereal password
      },
    });
   
    let info = await transporter.sendMail({
      from: `"T-shop" <${process.env.SNDEREMAIL}>`, // sender address
      to: dest, // list of receivers
      subject, // Subject line
      html:message, // html body
      
    });
   return info
}
export default SendEmail 