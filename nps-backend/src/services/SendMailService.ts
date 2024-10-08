import { SurveyAlreadyExistsError } from '../erros/SurveyAlreadyExistsError';
import { UserAlreadyExistsError } from '../erros/UserAlredyExistsError';
import prismaClient from '../prisma';
import NodeMaileService from './NodeMaileService';
import { resolve } from 'node:path';

export class SendMailService {
	async execute(email: string, survey_id: string) {
		const [userAlredyExists, surveyAlredyExists] = await Promise.all([
			prismaClient.user.findFirst({
				where: {
					email,
				},
			}),

			prismaClient.survey.findFirst({
				where: {
					id: survey_id,
				},
			}),
		]);

		if (!userAlredyExists || userAlredyExists == null) {
			throw new UserAlreadyExistsError();
		}

		if (!surveyAlredyExists || surveyAlredyExists == null) {
			throw new SurveyAlreadyExistsError();
		}

		const surveyUserAlreadyExists = await prismaClient.survey_User.findFirst({
			where: {
				user_id: userAlredyExists?.id,
				value: null,
			},
		});

		const npsPath = resolve(__dirname, '..', 'views', 'mails', 'npsMail.hbs');

		const variables = {
			name: userAlredyExists.name,
			title: surveyAlredyExists.title,
			description: surveyAlredyExists.description,
			id: '',
			link: process.env.URL_MAIL,
		};

		if (surveyUserAlreadyExists || surveyUserAlreadyExists != null) {
			variables.id = surveyUserAlreadyExists?.id;

			await NodeMaileService.execute(
				email,
				surveyAlredyExists.title,
				variables,
				npsPath
			);

			return surveyUserAlreadyExists;
		}

		const surveyUser = await prismaClient.survey_User.create({
			data: {
				user_id: userAlredyExists.id,
				survey_id,
			},
		});

		variables.id = surveyUser.id;
		await NodeMaileService.execute(
			email,
			surveyAlredyExists.title,
			variables,
			npsPath
		);

		return surveyUser;
	}

	async sendEmail() {}
}
