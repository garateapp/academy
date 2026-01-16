import AssessmentController from './AssessmentController'
import AssessmentAttemptController from './AssessmentAttemptController'
import AssessmentQuestionController from './AssessmentQuestionController'
const Controllers = {
    AssessmentController: Object.assign(AssessmentController, AssessmentController),
AssessmentAttemptController: Object.assign(AssessmentAttemptController, AssessmentAttemptController),
AssessmentQuestionController: Object.assign(AssessmentQuestionController, AssessmentQuestionController),
}

export default Controllers