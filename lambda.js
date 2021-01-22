var aws = require("aws-sdk");
var ses = new aws.SES({ region: "us-west-2" });

exports.handler = async function (event, context) {
  const { name, email, phone, message } = JSON.parse(event.body);

  const fullMessage = `
    ${name}<br />
    ${email}<br />
    ${phone}<br /><br />
    ${message}<br />
  `;

  var params = {
    Destination: {
      ToAddresses: ["tyler@webguyty.com"],
    },
    Message: {
      Body: {
        Html: { Data: fullMessage },
      },

      Subject: { Data: `New message from ${name}` },
    },
    Source: "tyler@webguyty.com",
  };

  return ses.sendEmail(params).promise();
};
