import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { join } from 'path';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendWelcomeEmail(userEmail: string, userName: string) {
    await this.mailerService.sendMail({
      to: userEmail,
      subject: 'Welcome to EduRevise',
      template: join(__dirname, 'templates', 'welcome.mail'),
      context: {
        name: userName,
      },
    });
  }

  async SendResetPassword(userEmail: string, resetLink: string) {
    await this.mailerService.sendMail({
      to: userEmail,
      subject: 'EduRevise - Reset Password',
      template: join(__dirname, 'template', 'password-reset.mailer'),
      context: {
        resetLink: resetLink,
      },
    });
  }
}
