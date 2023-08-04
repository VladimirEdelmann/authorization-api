import nodemailer from 'nodemailer';

class EmailConfirmationService {
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
      const confirmationLink = `http://localhost:5000/authorize/confirmEmail/${user.confirmationToken}`;
  
      const mailOptions = {
        from: this.transporter.options.auth.user,
        to: user.email,
        subject: 'Account Confirmation',
        text: `Click the link to confirm your account: ${confirmationLink}`,
      };
  
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Confirmation email sending error: ', error);
        } else {
          console.log('Confirmation email sent: ', info.response);
        }
      });
    }
}

export default new EmailConfirmationService('Outlook', 'vladimiredelmann@hotmail.com', 'gotsanN123J');
