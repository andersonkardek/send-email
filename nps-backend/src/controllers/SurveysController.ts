import { Request, Response } from "express";
import { SurveyService } from "../services/SurveysService";

interface ISurvey {
  title: string;
  description?: string;
}

export class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body as ISurvey;

    const service = new SurveyService();

    try {
      const result = await service.execute(title, description);

      response.status(201).json(result);
    } catch (error) {
      console.log(error);
    }
  }
}
