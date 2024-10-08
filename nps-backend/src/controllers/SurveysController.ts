import { Request, Response } from 'express';
import { SurveyService } from '../services/SurveysService';
import { asyncHandler } from './AsyncHandler';

interface ISurvey {
	title: string;
	description?: string;
}

export class SurveysController {
	create = asyncHandler(async (request: Request, response: Response) => {
		const { title, description } = request.body as ISurvey;

		const service = new SurveyService();

		const result = await service.execute(title, description);

		response.status(201).json(result);
	});

	show = asyncHandler(async (request: Request, response: Response) => {
		const service = new SurveyService();

		const result = await service.list();

		response.status(200).json(result);
	});
}
