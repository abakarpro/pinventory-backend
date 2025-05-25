const asynchHandler = require("express-async-handler");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

const contactUs = asynchHandler(async (req, res) => {
  let { subject, message } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found, please login");
  }

  // Validation
  if (!subject || !message) {
    res.status(400);
    throw new Error("Please add subject and message");
  }

  const send_to = process.env.EMAIL_USER;
  const send_from = process.env.EMAIL_USER;
  const reply_to = user.email;
  message = message + ` <hr> <br /> This message was sent by <strong> ${user.name} </strong> from the contact form on the Pinvent website. <br />  (${user.email})`;


  try {
    await sendEmail(subject, message, send_to, send_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Email Not Sent, Please try again",
    });
  }
});

module.exports = { contactUs };
