import AuthController from './AuthController'
import DashboardController from './DashboardController'
import UserController from './UserController'
import CurriculumController from './CurriculumController'
import LogController from './LogController'
const Admin = {
    AuthController: Object.assign(AuthController, AuthController),
DashboardController: Object.assign(DashboardController, DashboardController),
UserController: Object.assign(UserController, UserController),
CurriculumController: Object.assign(CurriculumController, CurriculumController),
LogController: Object.assign(LogController, LogController),
}

export default Admin