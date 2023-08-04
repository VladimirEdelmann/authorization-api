import nodemailer from 'nodemailer';

class ResetService {
    constructor(emailService, emailUsername, emailPassword) {
      this.transporter = nodemailer.createTransport({
        service: emailService,
        auth: {
          user: emailUsername,
          pass: emailPassword,
        },
      });
    }
  
    sendEmail(user) {
      const resetLink = `http://localhost:5000/authorize/reset/${user.resetToken}`;
  
      const mailOptions = {
        from: this.transporter.options.auth.user,
        to: user.email,
        subject: 'Reset password',
        text: `Click the link to reset your password: ${resetLink}`,
      };
  
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Reset password sending error: ', error);
        } else {
          console.log('Reset password sent: ', info.response);
        }
      });
    }
}

export default new ResetService('Outlook', 'vladimiredelmann@hotmail.com', 'gotsanN123J');
