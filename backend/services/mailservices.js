require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // use your email service provider here, e.g., 'gmail'
    auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_KEY  // your email password or app-specific password
    }
});




const sendRegsiterMail = async (to, name, username, password) => {
    const subject = 'Welcome to MIT-Valentine - Where Hearts Connect! 💝';
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to MIT-Valentine</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="padding: 20px; background-color: #ffffff;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <!-- Header -->
                    <tr>
                        <td style="text-align: center; padding-bottom: 20px;">
                            <h1 style="color: #ff4b8d; margin: 0;">MIT-Valentine</h1>
                            <p style="font-size: 18px; color: #666; margin: 10px 0;">Where College Connections Bloom 💕</p>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="background-color: #fff9f9; padding: 25px; border-radius: 10px; border: 1px solid #ffe6e6;">
                            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">Dear ${name},</p>
                            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Welcome to MIT-Valentine! 💝 They say the best love stories start in college, and yours is about to begin. Your perfect match could be just one click away - let the magic begin! ✨
                            </p>

                            <!-- Credentials Box -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fff0f5; border-radius: 8px; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="color: #ff4b8d; margin: 0 0 15px 0; text-align: center;">Your Login Details</h3>
                                        <div style="background-color: white; padding: 15px; border-radius: 6px; margin-bottom: 10px;">
                                            <p style="margin: 5px 0; font-size: 15px;"><strong>Username:</strong> ${username}</p>
                                        </div>
                                        <div style="background-color: white; padding: 15px; border-radius: 6px;">
                                            <p style="margin: 5px 0; font-size: 15px;"><strong>Password:</strong> ${password}</p>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding: 20px; text-align: center;">
                                        <a href="${process.env.FRONTEND_URL}/login" 
                                           style="display: inline-block; 
                                                  background: linear-gradient(45deg, #ff4b8d, #ff6b6b);
                                                  color: white;
                                                  padding: 15px 35px;
                                                  text-decoration: none;
                                                  border-radius: 25px;
                                                  font-size: 16px;
                                                  font-weight: bold;">
                                            Start Your Journey ✨
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Footer Quote -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="text-align: center; padding-top: 20px;">
                                        <p style="font-size: 16px; color: #666; font-style: italic; margin: 0 0 15px 0;">
                                            "Every great love story is beautiful, but ours could be extraordinary!"
                                        </p>
                                        <p style="font-size: 16px; color: #ff4b8d; font-weight: bold; margin: 0;">
                                            With love and excitement,<br>
                                            Team MIT-Valentine 💝
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

    const mailOptions = {
        from: {
            name: 'MIT-Valentine',
            address: process.env.EMAIL_USER
        },
        to: to,
        subject: subject,
        html: html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully');
    } catch (error) {
        console.log("Email sending error:", error);
    }
};




// module.exports = sendOrderMail
module.exports = {sendRegsiterMail};

