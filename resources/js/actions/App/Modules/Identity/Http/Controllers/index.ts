import LoginController from './LoginController'
import UserController from './UserController'
import RoleController from './RoleController'
const Controllers = {
    LoginController: Object.assign(LoginController, LoginController),
UserController: Object.assign(UserController, UserController),
RoleController: Object.assign(RoleController, RoleController),
}

export default Controllers