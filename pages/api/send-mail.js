const client = require('@sendgrid/client');
client.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  try {
    const request = {
      url: `/v3/marketing/contacts`,
      method: 'PUT',
      body: {
        contacts: [{ email: req.body.email }],
        // listId: ['6c0311a1-e196-4f9b-9e5a-cb8c85cdc3d1'],
      },
    };

    await client.request(request);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: '', success: true });
}

export default sendEmail;
