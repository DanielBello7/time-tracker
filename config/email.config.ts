import { variables } from "@/constants";
const EmailAPI = require('sib-api-v3-sdk');

const client = EmailAPI.ApiClient.instance;
const apiKeyObject = client.authentications['api-key'];
apiKeyObject.apiKey = variables.ENV.EMAIL_SECRET;

const smtpInstance = new EmailAPI.TransactionalEmailsApi();

export default smtpInstance;
