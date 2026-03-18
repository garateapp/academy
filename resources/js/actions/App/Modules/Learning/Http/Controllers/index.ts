import CourseController from './CourseController'
import LearningHistoryController from './LearningHistoryController'
import CourseModuleController from './CourseModuleController'
import AttendanceSessionController from './AttendanceSessionController'
import ModuleViewController from './ModuleViewController'
import ModuleProgressController from './ModuleProgressController'
import ModuleCompletionController from './ModuleCompletionController'
import InteractiveDocumentController from './InteractiveDocumentController'
import CategoryController from './CategoryController'
import LearningPathController from './LearningPathController'
const Controllers = {
    CourseController: Object.assign(CourseController, CourseController),
LearningHistoryController: Object.assign(LearningHistoryController, LearningHistoryController),
CourseModuleController: Object.assign(CourseModuleController, CourseModuleController),
AttendanceSessionController: Object.assign(AttendanceSessionController, AttendanceSessionController),
ModuleViewController: Object.assign(ModuleViewController, ModuleViewController),
ModuleProgressController: Object.assign(ModuleProgressController, ModuleProgressController),
ModuleCompletionController: Object.assign(ModuleCompletionController, ModuleCompletionController),
InteractiveDocumentController: Object.assign(InteractiveDocumentController, InteractiveDocumentController),
CategoryController: Object.assign(CategoryController, CategoryController),
LearningPathController: Object.assign(LearningPathController, LearningPathController),
}

export default Controllers