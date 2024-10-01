import { SurveyAlreadyExistsError } from "../erros/SurveyAlreadyExistsError"
import { UserAlreadyExistsError } from "../erros/UserAlredyExistsError"
import prismaClient from "../prisma"

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
		])

		if (!userAlredyExists || userAlredyExists == null) {
			throw new UserAlreadyExistsError()
		}

		if (!surveyAlredyExists || surveyAlredyExists == null) {
			throw new SurveyAlreadyExistsError()
		}

		const surveyUser = await prismaClient.survey_User.create({
			data: {
				user_id: userAlredyExists.id,
				survey_id,
			},
		})

		return surveyUser
	}
}
