const nodemailer = require('nodemailer');

async function main() {
  const port = 465;
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: port,
    secure: port === 465,
    auth: {
      user: 'fullguideazerbaycan@gmail.com',
      pass: 'tduffktpnyswkvfe',
    },
    tls: { rejectUnauthorized: false }
  });

  try {
    let info = await transporter.sendMail({
      from: '"Test" <fullguideazerbaycan@gmail.com>',
      to: 'fullguideazerbaycan@gmail.com',
      subject: "Hello \u2714",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending mail:", error);
  }
}

main();
