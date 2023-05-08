import nodemailer from "nodemailer";
import path from "path";
import nodemailerExpressHandlebars from "nodemailer-express-handlebars";

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   auth: {
//     user: pass,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

const account = await nodemailer.createTestAccount();
console.log("account", account);
// Create a SMTP transporter object
let transporter = nodemailer.createTransport({
  host: account.smtp.host,
  port: account.smtp.port,
  secure: account.smtp.secure,
  auth: {
    user: account.user,
    pass: account.pass,
  },
});

// point to template folder
const handlebarOptions = {
  viewEngine: {
    layoutsDir: path.resolve("../views/email-templates"),
    defaultLayout: false,
  },
  viewPath: path.resolve("../views/email-templates"),
};

transporter.use("compile", nodemailerExpressHandlebars(handlebarOptions));

/**
 *
 * @param {String} receiverEmail  // One email or comma seperated emails
 * @param {Object} data // Key-value pair. Value will be shown in email.
 */
try {
  const sendMail = async (receiverEmail, data) => {
    const mailOptions = {
      from: "test",
      to: receiverEmail, // one or list of receivers
      subject: "test", // subject line of email
      template: "signup-email-template",
      context: data, // data object which will render in handlebar email template
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("response", response);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(response));
  };

  let data = { data: "testdataaaaaaaaa" };
  sendMail("dhrumitpatel48@gmail.com", data);
} catch (error) {
  console.log(error);
}

// export default sendMail;
