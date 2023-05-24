const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req, res) {
  if (req.method === "POST") {
    const { messages } = await req.json();

    console.log(messages);

    try {
      const { data } = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      //   res.status(200).json({ response: data.choices[0].message.content });

      return new Response(data.choices[0].message.content, {
        status: 200,
      });
    } catch (error) {
      //   res.status(500).json({
      //     message: "An error occurred while generating GPT-4 response",
      //     error: error,
      //   });
      return new Response(error, {
        status: 500,
      });
    }
  } else {
    // res.setHeader("Allow", ["POST"]);

    // res.status(405).json({ message: `Method ${req.method} not allowed` });
    return new Response(`Method ${req.method} not allowed`, {
      status: 405,
    });
  }
}

// software engineering role looking for a full stack web developer that has great teamworking skills and is well versed in react, tailwind and express js. To be paid in equity.
