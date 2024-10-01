export class SurveyAlreadyExistsError extends Error {
	constructor(message = "Survey already exists") {
		super(message)
		this.name = "SurveyAlreadyExistsError"
	}
}
