import { Request, Response } from "express"
import { SendMailService } from "../services/SendMailService"
import { UserAlreadyExistsError } from "../erros/UserAlredyExistsError"
import { SurveyAlreadyExistsError } from "../erros/SurveyAlreadyExistsError"

interface SendMailDTO {
	survey_id: string
	id: string
	user_id: string
	value?: number
	created_at: Date
}

export class SendMailController {
	async create(request: Request, response: Response) {
		const { email, survey_id } = request.body

		const service = new SendMailService()

		try {
			const result = await service.execute(email, survey_id)

			response.status(201).json(result)
		} catch (err) {
			if (
				err instanceof UserAlreadyExistsError ||
				err instanceof SurveyAlreadyExistsError
			) {
				return response.status(409).json({ message: err.message })
			}

			return response.status(500).json({ message: "Internal Server Error" })
		}
	}
}
