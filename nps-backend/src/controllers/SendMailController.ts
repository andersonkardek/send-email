import { NextFunction, Request, Response } from 'express'
import { SendMailService } from '../services/SendMailService'
import { asyncHandler } from './AsyncHandler'

interface SendMailDTO {
	survey_id: string
	id: string
	user_id: string
	value?: number
	created_at: Date
}

export class SendMailController {
	create = asyncHandler(async (request: Request, response: Response) => {
		const { email, survey_id } = request.body

		const service = new SendMailService()

		const result = await service.execute(email, survey_id)

		response.status(201).json(result)
	})
}
