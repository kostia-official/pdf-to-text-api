import express from "express";
import cors from "cors";
import { pdfRouter } from "./src/modules/pdf/pdf.router";

const app = express();
const port = 8080;

app.use(cors());
app.use(pdfRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
