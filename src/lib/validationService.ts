
// This file acts as a re-export facade for the validation services
// which have been reorganized into separate modules

import { runValidation } from "./validation/validationRunner";
import { 
  generateReport,
  generateCertificate,
  generateAndDownloadPDF,
  generateAndDownloadCertificate,
  downloadTextFile 
} from "./validation/reportGenerator";
import { saveTestResults } from "./validation/databaseService";

export {
  runValidation,
  generateReport,
  generateCertificate,
  generateAndDownloadPDF,
  generateAndDownloadCertificate,
  downloadTextFile,
  saveTestResults
};
