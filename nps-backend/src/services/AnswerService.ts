import { UserAlreadyExistsError } from '../erros/UserAlredyExistsError';
import prismaClient from '../prisma';

export class AnswerService {
	async execute(value: number, u: string) {
		const surveyUser = await prismaClient.survey_User.findFirst({
			where: {
				id: u,
			},
		});

		if (!surveyUser) {
			throw new UserAlreadyExistsError();
		}

		surveyUser.value = Number(value);

		const updateValue = await prismaClient.survey_User.update({
			where: {
				id: u,
			},
			data: {
				value,
			},
		});
		return updateValue;
	}
}
