import { Survey } from "@prisma/client";
import prismaClient from "../prisma";

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
}
