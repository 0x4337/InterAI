const axios = require("axios");

export async function POST(req, res) {
  if (req.method === "POST") {
    const { text } = await req.json();

    try {
      const response = await axios.post(
        "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",
        {
          text: text,
          voice_settings: {
            stability: 0,
            similarity_boost: 0,
          },
        },
        {
          headers: {
            Accept: "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": process.env.ELEVENLABS_API_KEY,
          },
          responseType: "arraybuffer",
        }
      );

      const audioData = Buffer.from(response.data, "binary").toString("base64");

      return new Response(audioData, {
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return new Response(
        `Error whilst trying to generate text-to-speech: ${error}`,
        {
          status: 500,
        }
      );
    }
  } else {
    return new Response(`Method ${req.method} not allowed`, {
      status: 405,
    });
  }
}
