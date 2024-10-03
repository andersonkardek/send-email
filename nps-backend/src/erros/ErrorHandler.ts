import { Request, Response, NextFunction } from "express"

export class BaseError extends Error {
	public statusCode: number

	constructor(message: string, statusCode: number) {
		super(message)
		this.statusCode = statusCode
	}
}

export const errorHandler = (
	err: BaseError | Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof BaseError) {
		return res.status(err.statusCode).json({
			message: err.message,
			statusCode: err.statusCode,
		})
	}

	console.error(err.stack)

	res.status(500).json({
		message: "Internal Server Error",
		statusCode: 500,
	})
}
