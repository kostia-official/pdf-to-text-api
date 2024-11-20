import { parentPort } from "worker_threads";
import { readPdfText } from "pdf-text-reader";

parentPort?.on("message", async (filePath) => {
  try {
    const text = await readPdfText({ url: filePath });
    parentPort?.postMessage({ success: true, data: text });
  } catch (error) {
    parentPort?.postMessage({ success: false, error });
  }
});
