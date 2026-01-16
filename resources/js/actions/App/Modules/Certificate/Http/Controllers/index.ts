import CertificateController from './CertificateController'
import CertificateTemplateController from './CertificateTemplateController'
const Controllers = {
    CertificateController: Object.assign(CertificateController, CertificateController),
CertificateTemplateController: Object.assign(CertificateTemplateController, CertificateTemplateController),
}

export default Controllers