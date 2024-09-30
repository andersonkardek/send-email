import { UserAlreadyExistsError } from "../erros/UserAlredyExistsError";
import prismaClient from "../prisma";

export class UserService {
  async execute(name: string, email: string) {
    const userAlredyExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlredyExists) {
      throw new UserAlreadyExistsError();
    }

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
      },
    });

    return user;
  }
}
