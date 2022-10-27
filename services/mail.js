const mailgun = require("mailgun-js");

const mg = mailgun({
  apiKey: "key-1371e9a62a61cd609309d0a69edd9431",
  domain: "api.pneumaimpact.ng",
});

exports.sendVerificationMail = async (user) => {
  console.log(user.email);
  const data = {
    from: `Pneumaimpact <no-reply@api.pneumaimpact.ng>`,
    subject: "Verify your email",
    to: `${user.email}`,
    text: `Verify you account using the following code.<br/> <b>${user.verification_token}</b>`,
  };

  mg.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
    } else {
      console.log(body), "non-error line";
    }
  });
};
