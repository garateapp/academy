import SurveyController from './SurveyController'
import SurveyAssignmentController from './SurveyAssignmentController'
import SurveyQuestionController from './SurveyQuestionController'
import SurveyResponseController from './SurveyResponseController'
const Controllers = {
    SurveyController: Object.assign(SurveyController, SurveyController),
SurveyAssignmentController: Object.assign(SurveyAssignmentController, SurveyAssignmentController),
SurveyQuestionController: Object.assign(SurveyQuestionController, SurveyQuestionController),
SurveyResponseController: Object.assign(SurveyResponseController, SurveyResponseController),
}

export default Controllers