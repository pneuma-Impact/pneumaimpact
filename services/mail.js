const mailgun = require("mailgun-js");

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.DOMAIN,
});

exports.sendVerificationMail = async (user) => {
  console.log(user.email);
  const data = {
    from: `Pneumaimpact <no-reply@pneumaimpact.ng>`,
    subject: "Verify your email",
    to: `${user.email}`,
    text: `Verify your account using the following code.<br/> <b>${user.verification_token}</b>`,
  };

  mg.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
      console.log(
        new Date().toLocaleString() + " Domain: " + process.env.DOMAIN
      );
    } else {
      console.log(body), "non-error line";
    }
  });
};
