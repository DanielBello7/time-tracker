import smtpInstance from "@/config/email.config";
import { variables } from "@/constants";

interface SendInBlueSendMailDataType {
  to: { email: string }[]
  subject: string
  textContent?: string
  htmlContent?: string
  params?: any
}

export default async function sendEmail(data: SendInBlueSendMailDataType) {
  const response = await smtpInstance.sendTransacEmail({
    sender: {
      email: variables.ENV.APP_EMAIL,
      name: variables.ENV.APP_EMAIL_NAME
    },
    to: data.to,
    subject: data.subject,
    textContent: data.textContent,
    htmlContent: data.htmlContent,
    params: data.params
  });
  return response;
}
