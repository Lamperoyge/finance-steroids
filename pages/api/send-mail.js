import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  console.log(req.body);
  try {
    await sendgrid.send({
      to: 'contact@mustmake.ro', // Your email where you'll receive emails
      from: 'contact@mustmake.ro', // your website email address here
      subject: `[Lead from website] : ${req.body.email}`,
      html: `
        <body>
            <div>
              <div>
              Email: ${req.body.email}
              </div>
              
            </div>
        </body>
      `,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: '', success: true });
}

export default sendEmail;
