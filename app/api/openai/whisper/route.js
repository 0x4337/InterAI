// import { Configuration, OpenAIApi } from "openai";
// import { promises as fs } from "fs";
// import { join } from "path";
// import formidable from "formidable";

// const openAiConfig = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(openAiConfig);

// export const apiConfig = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const form = new formidable.IncomingForm();

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         res.status(500).json({ message: "Error parsing the file", error: err });
//         return;
//       }

//       const file = files.audio;

//       // Save buffer to a temporary file
//       const tempFilePath = join(process.cwd(), "temp_audio.webm");
//       await fs.writeFile(tempFilePath, file);

//       // Create a read stream from the temporary file
//       const fileStream = fs.createReadStream(tempFilePath);

//       const { data } = await openai.createTranscription(
//         fileStream,
//         "whisper-1"
//       );

//       // Delete the temporary file
//       await fs.unlink(tempFilePath);

//       console.log(data);
//       res.status(200).json({
//         message: "Successfully converted speech to text",
//         whisper: data,
//       });
//     });
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }

import { Configuration, OpenAIApi } from "openai";
import { promises as fs } from "fs";
import { createReadStream } from "fs";
import { join } from "path";
import formidable from "formidable";

const openAiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(openAiConfig);

export const apiConfig = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ message: "Error parsing the file", error: err });
        return;
      }

      const file = files.audio;

      // Save buffer to a temporary file
      const tempFilePath = join(process.cwd(), "temp_audio.webm");
      await fs.rename(file.path, tempFilePath);

      // Create a read stream from the temporary file
      const fileStream = createReadStream(tempFilePath);

      const { data } = await openai.createTranscription(
        fileStream,
        "whisper-1"
      );

      // Delete the temporary file
      await fs.unlink(tempFilePath);

      console.log(data);
      res.status(200).json({
        message: "Successfully converted speech to text",
        whisper: data,
      });
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
