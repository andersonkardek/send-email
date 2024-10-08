import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};
};
