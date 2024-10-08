import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'node:fs';

class NodeMaileService {
	private cliente: Transporter | undefined;

	constructor() {
		this.initializeTransporter();
	}

	private async initializeTransporter() {
		const account = await nodemailer.createTestAccount();
		this.cliente = nodemailer.createTransport({
			host: account.smtp.host,
			port: account.smtp.port,
			secure: account.smtp.secure, // true for port 465, false for other ports
			auth: {
				user: account.user,
				pass: account.pass,
			},
		});
	}
	async execute(to: string, subject: string, variable: object, path: string) {
		const templateFileContent = fs.readFileSync(path).toString('utf-8');

		const mailTemplateParse = handlebars.compile(templateFileContent);

		const html = mailTemplateParse(variable);

		if (!this.cliente) {
			throw new Error('Transporter is not initialized yet');
		}

		const message = await this.cliente?.sendMail({
			to,
			subject,
			html,
			from: 'NPS <noreplay@nps.com.br>',
		});

		console.log('Message sent: %s', message.messageId);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
	}
}

export default new NodeMaileService();
