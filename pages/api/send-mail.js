// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//todo send the email to sendgrid
export default function handler(req, res) {
  console.log(req.body);
  res.status(200).json({ name: 'John Doe' });
}
