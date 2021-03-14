import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import dotEnv from '../.env';

interface Address {
  email: string;
  name: string;
}
interface Message {
  to: Address;
  from: Address;
  subject: string;
  body: string;
}

class MailTrapProvider {
  private transporter: Mail

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: dotEnv.mailUser,
        pass: dotEnv.mailPassword,
      },
    });
  }

  async sendMail(message: Message) {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,

    });
  }
}
const mailTrapProvider = new MailTrapProvider();
export default mailTrapProvider;
