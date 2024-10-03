import { BaseError } from "./ErrorHandler"

export class SurveyAlreadyExistsError extends BaseError {
	constructor(message = "Survey already exists") {
		super(message, 409)
	}
}
