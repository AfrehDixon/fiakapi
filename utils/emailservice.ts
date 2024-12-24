import nodemailer from 'nodemailer';

const SMTP_HOST = 'server233.web-hosting.com';
const SMTP_PORT = 465;
const EMAIL_USER = 'info@bmptsolutions.com';
const EMAIL_PASS = 'Banker22555?';

interface EmailParams {
  name: string;
  email: string;
  subject: string;
  content: string;
}

export async function sendEmail({ name, email, subject, content }: EmailParams) {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    debug: true, // Enable debug mode
    logger: true, // Enable logs
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  // Email options
  const mailOptions = {
    from: `"${name}" <${EMAIL_USER}>`, // Use the authenticated email address
    to: EMAIL_USER,
    subject: subject || 'New Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${content}`,
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Error sending email' };
  }
}