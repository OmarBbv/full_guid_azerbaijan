const nodemailer = require('nodemailer');

async function main() {
  const port = 587;
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: port,
    secure: port === 465, // false for 587
    auth: {
      user: 'memix5342@gmail.com',
      pass: 'xyxf mzfg bykh nkos',
    },
    tls: { rejectUnauthorized: false }
  });

  try {
    let info = await transporter.sendMail({
      from: '"FullGuide Azerbaijan" <memix5342@gmail.com>',
      to: '4ofphyz047@yzcalo.com',
      subject: 'Test Memix Gmail in FullGuide',
      text: 'Hello, this is a test to TempMail using Memix credentials.',
      html: '<b>Hello, this is a test to TempMail using Memix credentials.</b>',
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending mail:", error);
  }
}

main();
