import { BaseError } from './ErrorHandler';

export class UserAlreadyExistsError extends BaseError {
	constructor(message = 'User already exists') {
		super(message, 409);
	}
}
