import { NextResponse } from "next/server";
import multer from "multer";
import nc from "next-connect";

const upload = multer({ storage: multer.memoryStorage() });

const handler = nc()
  .use(upload.single("image"))
  .post(async (req, res) => {
    // Simulating a model prediction response
    const wildfireDetected = Math.random() > 0.5;
    const confidence = Math.floor(Math.random() * 100);

    return res.json({
      wildfire_prediction: wildfireDetected,
      confidence: confidence,
    });
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
