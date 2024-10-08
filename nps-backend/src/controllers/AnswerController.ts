import { Request, Response } from 'express';
import { asyncHandler } from './AsyncHandler';
import { AnswerService } from '../services/AnswerService';

export class AnswerController {
	create = asyncHandler(async (request: Request, response: Response) => {
		const { value } = request.params;
		const { u } = request.query;

		const service = new AnswerService();

		const result = await service.execute(Number(value), String(u));

		response.status(201).json(result);
	});
}
