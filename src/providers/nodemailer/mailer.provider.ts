import { BadRequestException } from '@nestjs/common';
import { STATUS_CODES } from 'http';
import * as nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export interface iEmailInfo {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export class emailProvider {
  public async sendEmail(data: iEmailInfo): Promise<any> {
    const transportInfo: SMTPTransport.Options = {
      host: process.env.MAILER_HOST,
      port: Number(process.env.MAILER_PORT),
      secure: process.env.MAILER_SECURE === 'true',
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
      }
    }

    // console.log(transportInfo);

    const transport = nodemailer.createTransport(transportInfo)

    const emailInfo = {
      from: process.env.MAILER_INFO_FROM,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html
    }

    // console.log(emailInfo);


    try {
      await transport.sendMail(emailInfo);
    } catch (error) {
      console.error(error);
      throw new BadRequestException({}, { description: 'Erro ao enviar email', cause: 'provider-nodemailer-sendEmail' });
    }

    return true
  }


}