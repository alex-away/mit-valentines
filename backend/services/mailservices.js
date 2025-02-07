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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #ff4b8d;">MIT-Valentine</h1>
                <p style="font-size: 18px; color: #666;">Where College Connections Bloom 💕</p>
            </div>
            <div style="background-color: #fff9f9; padding: 25px; border-radius: 10px; border: 1px solid #ffe6e6;">
                <p style="font-size: 16px; line-height: 1.6;">Dear ${name},</p>
                <p style="font-size: 16px; line-height: 1.6;">
                    Welcome to MIT-Valentine! 🌹 We're absolutely delighted to have you join our special community where meaningful connections begin.
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                    Get ready to embark on a heartwarming journey where you might just find that special someone who makes your college life even more memorable. Whether you're looking for a romantic connection or a meaningful friendship, MIT-Valentine is here to make your experience magical.
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                    Our platform is designed with care to help you connect with like-minded individuals who share your interests, values, and dreams. Remember, every great love story starts with a simple hello! 
                </p>
                
                <div style="background-color: #fff0f5; padding: 20px; border-radius: 8px; margin-top: 25px; border: 2px dashed #ff4b8d;">
                    <h3 style="color: #ff4b8d; margin-bottom: 15px; text-align: center;">Your Portal to Romance</h3>
                    <div style="background-color: white; padding: 15px; border-radius: 6px; margin-bottom: 10px;">
                        <p style="margin: 5px 0; font-size: 15px;"><strong>Username:</strong> ${username}</p>
                    </div>
                    <div style="background-color: white; padding: 15px; border-radius: 6px;">
                        <p style="margin: 5px 0; font-size: 15px;"><strong>Password:</strong> ${password}</p>
                    </div>
                </div>

                <div style="text-align: center; margin-top: 35px;">
                    <p style="font-size: 16px; line-height: 1.6; color: #666;">
                        Your perfect match could be just a click away! Join us in creating beautiful connections and unforgettable moments. 💫
                    </p>
                    <a href="${process.env.FRONTEND_URL+"/login"}" 
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
                        Start Your Journey ✨
                    </a>
                </div>

                <div style="text-align: center; margin-top: 30px; font-style: italic;">
                    <p style="font-size: 16px; color: #666;">
                        "Every great love story is beautiful, but ours could be extraordinary!"
                    </p>
                    <p style="font-size: 16px; color: #ff4b8d; font-weight: bold; margin-top: 20px;">
                        With love and excitement,<br>
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




// module.exports = sendOrderMail
module.exports = {sendRegsiterMail};

