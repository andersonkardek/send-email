import { Request, Response } from "express"
import { UserService } from "../services/UserService"
import { asyncHandler } from "./AsyncHandler"

interface IUser {
	name: string
	email: string
}

export class UserController {
	create = asyncHandler(async (request: Request, response: Response) => {
		const { name, email } = request.body as IUser

		const service = new UserService()
		const result = await service.execute(name, email)

		response.status(201).json(result)
	})
}
