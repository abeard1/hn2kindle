import nodemailer, { SentMessageInfo } from 'nodemailer';
import { Submission } from '../reddit-utilities/submission';

const client: nodemailer.Transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  }
});

export async function sendMail(
  submission: Submission,
  content: string
): Promise<SentMessageInfo> {
  let email = {
    from: 'convert@reddit2kindle.com',
    to: '',
    subject: submission.title,
    attachments: [
      {
        filename: submission.title + '.html',
        content: content
      }
    ]
  };
  client
    .sendMail(email)
    .then(info => console.log(info))
    .catch(info => console.log(info));
}
