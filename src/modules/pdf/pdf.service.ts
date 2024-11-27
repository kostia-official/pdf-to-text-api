import { join } from "path";
import { runInProcess } from "../../utils/runInProcess";

class PdfService {
  async parsePdfText(filePath: string): Promise<string> {
    return runInProcess(join(__dirname, "pdfParse.worker.ts"), filePath, {
      timeoutMs: 3000,
    });
  }
}

export const pdfService = new PdfService();
