const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "mariem.aissa@ensi-uma.tn",
        pass: "mimiaa123",
    },
});

const sendEmail = async (email, activationCode) => {
    try {
      const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Mail confirmation',
        html: `
        <p>Dear user,</p>
        <p>Thank you for registering with our application. Please click the following link to confirm your email address:</p>
        <p><a href="http://192.168.1.13:5000/verifUser/${activationCode}?redirect=exp://192.168.1.13:19000/confirm-email">Confirm Email</a></p>
        <p>If you did not register with our website, please ignore this email.</p>
      `
      
      };
      await transport.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.log(error);
    }
  };
  
  const sendResetPasswordEmail = async (email, enteredCode) => {
    
        
    try {
      const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Password reset request',
        html: `
          <div>
            <h1>Password reset</h1>
            <p>You can reset your password by entering this code: ${enteredCode}</p>
          </div>
        `
      }; 
      await transport.sendMail(mailOptions);
      console.log('Email sent successfully')
      return randomCode;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  
  
  
  module.exports = {
    sendEmail,sendResetPasswordEmail
  };