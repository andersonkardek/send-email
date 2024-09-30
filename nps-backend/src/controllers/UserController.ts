import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserAlreadyExistsError } from "../erros/UserAlredyExistsError";

interface IUser {
  name: string;
  email: string;
}

export class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body as IUser;

    const service = new UserService();

    try {
      const result = await service.execute(name, email);

      response.status(201).json(result);
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        return response.status(409).json({ message: err.message });
      }
    }
  }
}
