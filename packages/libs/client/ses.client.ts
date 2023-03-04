import { SES } from "aws-sdk";

const sesClient = new SES();

export interface MailFrom {
  name: string;
  email: string;
}

export interface Mail {
  from: string | MailFrom;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export class SESClient {
  NO_REPLY = "noreply@flivity.com";

  async confirmEmail(to: string, link: string) {
    return await this.sendEmail({
      from: this.NO_REPLY,
      to: to,
      subject: "Confirmation email",
      text: `Hello, here is your confirmation email ${link}.`,
    });
  }

  private async sendEmail(mail: Mail) {
    const name = typeof mail.from == "string" ? "Flivity" : mail.from.name;
    const email = typeof mail.from == "string" ? mail.from : mail.from.email;

    return await sesClient
      .sendEmail({
        Source: `${name} <${email}>`,
        Destination: {
          ToAddresses: [mail.to],
        },
        Message: {
          Body: {
            ...(mail.text
              ? { Text: { Charset: "UTF-8", Data: mail.text } }
              : {}),
          },
          Subject: {
            Charset: "UTF-8",
            Data: mail.subject,
          },
        },
      })
      .promise();
  }
}
