import Identity from './Identity'
import Learning from './Learning'
import Assessment from './Assessment'
import Certificate from './Certificate'
import Audit from './Audit'
import Reporting from './Reporting'
import Survey from './Survey'
const Modules = {
    Identity: Object.assign(Identity, Identity),
Learning: Object.assign(Learning, Learning),
Assessment: Object.assign(Assessment, Assessment),
Certificate: Object.assign(Certificate, Certificate),
Audit: Object.assign(Audit, Audit),
Reporting: Object.assign(Reporting, Reporting),
Survey: Object.assign(Survey, Survey),
}

export default Modules