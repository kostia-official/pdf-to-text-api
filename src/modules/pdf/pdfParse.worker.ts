import { readPdfText } from "pdf-text-reader";

process.on("message", async (message: string) => {
  const filePath = JSON.parse(message);

  try {
    const text = await readPdfText({
      url: filePath,
    });
    process.send?.({ result: text });
  } catch (err) {
    const error = err as Error;
    process.send?.({ error: error.message });
  }
});
