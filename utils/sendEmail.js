const nodemailer = require("nodemailer");

// Create Email transport
const sendMail = async (subject, message, send_to, send_from) => {
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  //  tls: {
  //     // ciphers: "SSLv3",
  //     rejectUnauthorized: false,
  //   },
});

  // Options for sending Email
  const mailOptions = {
    from: send_from,
    to: send_to,
    subject: subject,
    html: message,
  };

  // Send Email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email");
    }
    console.log("Email sent:", info.response);
    res.status(200).send("Email sent successfully");
  });


};

module.exports = sendMail;
