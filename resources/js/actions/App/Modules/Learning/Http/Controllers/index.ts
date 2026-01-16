import CourseController from './CourseController'
import CourseModuleController from './CourseModuleController'
import AttendanceSessionController from './AttendanceSessionController'
import ModuleViewController from './ModuleViewController'
import ModuleProgressController from './ModuleProgressController'
import ModuleCompletionController from './ModuleCompletionController'
import CategoryController from './CategoryController'
import LearningPathController from './LearningPathController'
const Controllers = {
    CourseController: Object.assign(CourseController, CourseController),
CourseModuleController: Object.assign(CourseModuleController, CourseModuleController),
AttendanceSessionController: Object.assign(AttendanceSessionController, AttendanceSessionController),
ModuleViewController: Object.assign(ModuleViewController, ModuleViewController),
ModuleProgressController: Object.assign(ModuleProgressController, ModuleProgressController),
ModuleCompletionController: Object.assign(ModuleCompletionController, ModuleCompletionController),
CategoryController: Object.assign(CategoryController, CategoryController),
LearningPathController: Object.assign(LearningPathController, LearningPathController),
}

export default Controllers