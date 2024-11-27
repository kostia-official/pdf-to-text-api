import express from "express";
import fs from "fs";
import multer from "multer";
import { pdfService } from "./pdf.service";

export const pdfRouter = express.Router();

const upload = multer({ dest: "/tmp" });

pdfRouter.post("/pdf/parse/text", upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).send("No file");
    return;
  }
  if (req.file.mimetype !== "application/pdf") {
    res.status(400).send("Only pdf files are allowed");
    return;
  }
  const filePath = req.file.path;

  try {
    const pdfText = await pdfService.parsePdfText(filePath);

    res.json({ text: pdfText });
  } catch (err) {
    res.status(422).send("Can't parse PDF");
  } finally {
    fs.unlinkSync(filePath);
  }
});
