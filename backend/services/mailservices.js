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

const sendRegsiterMail = (to,name) => {
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
                <div style="text-align: center; margin-top: 30px;">
                    <p style="font-size: 16px; color: #ff4b8d; font-weight: bold;">
                        With love and style,<br>
                        Team MIT-Valentine 💝
                    </p>
                </div>
            </div>
            <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
                <p>Stay connected with us on our social media for daily doses of inspiration!</p>
            </div>
        </div>`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,  // Now sending to the user's email address
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
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
            return console.log(error);
        }
        console.log('new issuse reported!');
    });
};




// module.exports = sendOrderMail
module.exports = {sendOtpEmail,sendRegsiterMail,sendIssueReported};
