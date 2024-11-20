import { join } from "path";
import { runWorker } from "../../utils";

class PdfService {
  async parsePdfText(filePath: string): Promise<string> {
    return runWorker(join(__dirname, "pdf.worker.ts"), filePath);
  }
}

export const pdfService = new PdfService();
