import users from './users'
import roles from './roles'
import categories from './categories'
import learningPaths from './learning-paths'
import assessments from './assessments'
import certificates from './certificates'
import certificateTemplates from './certificate-templates'
import auditLogs from './audit-logs'
import reports from './reports'
import surveys from './surveys'
const admin = {
    users: Object.assign(users, users),
roles: Object.assign(roles, roles),
categories: Object.assign(categories, categories),
learningPaths: Object.assign(learningPaths, learningPaths),
assessments: Object.assign(assessments, assessments),
certificates: Object.assign(certificates, certificates),
certificateTemplates: Object.assign(certificateTemplates, certificateTemplates),
auditLogs: Object.assign(auditLogs, auditLogs),
reports: Object.assign(reports, reports),
surveys: Object.assign(surveys, surveys),
}

export default admin