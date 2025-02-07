require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // use your email service provider here, e.g., 'gmail'
    auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_KEY  // your email password or app-specific password
    }
});


const sendOtpEmail = (to, otp) => {
    const subject = 'OTP Verification';
    //   const text = `Your OTP code is ${otp}. It is valid for 5 minutes.`;
    const html = `<div>AawaraEthincs</div>
            <div>
              <p>Your OTP for verification <b>${otp}</b>.Do not share this OTP with anyone.</p>
              <p>Thank You!</p>
            </div>`;

    const mailOptions = {
        from: process.env.EMAIL_USER, // sender address
        to: to,                       // list of receivers
        subject: subject,             // Subject line
        html: html                    // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('OTP email sent: %s', info.messageId);
    });
};

const sendRegsiterMail = async (to, name, email, password) => {
    const subject = 'Welcome to MIT-Valentine - Your Journey Begins Here! 💫';
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #ff4b8d;">Your Valentine</h1>
                <p style="font-size: 18px; color: #666;">Where Style Meets Soul ✨</p>
            </div>
            <div style="background-color: #fff9f9; padding: 25px; border-radius: 10px; border: 1px solid #ffe6e6;">
                <p style="font-size: 16px; line-height: 1.6;">Dear ${name},</p>
                <p style="font-size: 16px; line-height: 1.6;">
                    Welcome to our beautiful family! 🌸 We're absolutely thrilled to have you join us on this wonderful journey.
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                    At MIT-Valentine, we believe in creating magical moments through fashion. Your registration marks the beginning of a beautiful relationship with us. 
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                    Get ready to explore our enchanting collection and find pieces that speak to your soul. ✨
                </p>
                
                <div style="background-color: #fff0f5; padding: 20px; border-radius: 8px; margin-top: 25px; border: 2px dashed #ff4b8d;">
                    <h3 style="color: #ff4b8d; margin-bottom: 15px; text-align: center;">Your Login Credentials</h3>
                    <div style="background-color: white; padding: 15px; border-radius: 6px; margin-bottom: 10px;">
                        <p style="margin: 5px 0; font-size: 15px;"><strong>Email:</strong> ${email}</p>
                    </div>
                    <div style="background-color: white; padding: 15px; border-radius: 6px;">
                        <p style="margin: 5px 0; font-size: 15px;"><strong>Password:</strong> ${password}</p>
                    </div>
                </div>

                <div style="text-align: center; margin-top: 35px;">
                    <p style="font-size: 16px; line-height: 1.6; color: #666;">
                        Ready to start your romantic journey with us? Your perfect match awaits! 💕
                    </p>
                    <a href="${process.env.FRONTEND_URL}" 
                       style="display: inline-block; 
                              background: linear-gradient(45deg, #ff4b8d, #ff6b6b);
                              color: white;
                              padding: 15px 35px;
                              text-decoration: none;
                              border-radius: 25px;
                              font-size: 16px;
                              font-weight: bold;
                              margin: 20px 0;
                              box-shadow: 0 4px 15px rgba(255, 75, 141, 0.2);
                              transition: transform 0.3s ease;">
                        Begin Your Love Story 💘
                    </a>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <p style="font-size: 16px; color: #ff4b8d; font-weight: bold;">
                        With love and style,<br>
                        Team MIT-Valentine 💝
                    </p>
                </div>
            </div>
        </div>`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("err",error);
        }
        console.log('Welcome email sent successfully');
    });
};

const sendIssueReported = (subject,main,orderid) => {
    const Subject = `${subject}`;
    const html = `<div>AawaraEthincs</div>
            <div>
                <p>A new issue has been reported for the ORDER_ID:${orderid}</p>
                <P>${main}</p>
                <p>Kindly Login and Check the Status!</p>
            </div>`;

    const mailOptions = {
        from: process.env.EMAIL_USER, // sender address
        to: 'jatinvardhani@gmail.com',                       // list of receivers
        subject: Subject,             // Subject line
        html: html                    // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("error",error);
        }
        console.log('new issuse reported!');

    });
};




// module.exports = sendOrderMail
module.exports = {sendOtpEmail,sendRegsiterMail,sendIssueReported};
