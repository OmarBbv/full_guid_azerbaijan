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
      from: '"FullGuide Azerbaijan" <fullguideazerbaycan@gmail.com>',
      to: 'auvz4ogbj6@bwmyga.com',
      subject: 'Test Temp Mail',
      text: 'Hello, this is a test to TempMail.',
      html: '<b>Hello, this is a test to TempMail.</b>',
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending mail:", error);
  }
}

main();
