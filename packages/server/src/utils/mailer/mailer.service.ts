import { Injectable } from "@nestjs/common";
import { Request } from "express";
import nodemailer, { Transporter } from "nodemailer";

import { EMAIL_PASSWORD, EMAIL_USERNAME } from "config/secrets";
import { TokenService } from "modules/token/token.service";
import getServerAddress from "utils/getServerAddress";

import createActivationEmail from "./emails/createActivationEmail";

@Injectable()
export class MailerService {
  private readonly transporter: Transporter;

  constructor(private readonly tokenService: TokenService) {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true, // true for 465, false for other ports
      auth: {
        user: EMAIL_USERNAME, // generated ethereal user
        pass: EMAIL_PASSWORD // generated ethereal password
      }
    });
  }

  sendActivationLink(email: string, request: Request) {
    const token = this.tokenService.generateEmailToken(email);
    const link = `${getServerAddress(request)}/auth/${token}`;

    this.transporter.sendMail({
      from: "'iMovie' <registration@imovie.com>",
      to: email,
      subject: "Activate your account", // Subject line
      text: "", // plain text body
      html: createActivationEmail(link)
    });
  }
}
