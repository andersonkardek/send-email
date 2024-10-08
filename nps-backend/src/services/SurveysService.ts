import prismaClient from '../prisma';

export class SurveyService {
	async execute(title: string, description?: string) {
		const survey = await prismaClient.survey.create({
			data: {
				title,
				description,
			},
		});

		return survey;
	}

	async list() {
		const surveys = await prismaClient.survey.findMany();

		return surveys;
	}
}
