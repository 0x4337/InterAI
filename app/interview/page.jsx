"use client";

import axios, { AxiosHeaders } from "axios";
import { OpenAIApiAxiosParamCreator } from "openai";
import { useEffect, useState } from "react";

import RecordRTC from "recordrtc";

const Interview = () => {
  // TODO:
  // - [ ] When a user clicks start interview, check what category they selected and the job desc.
  // - [ ] Feed this to a system prompt to GPT-4 that will start an interview based on the job desc and category
  // - [ ] Feed the GPT-4 output to Eleven Labs API to generate speech.
  // - [ ] Play the speech to the user.
  // - [ ] Add a record button to start recording the users response.
  // - [ ] Take the recorded response and transform it into a whisper compatible format.
  // - [ ] Feed the transcript to GPT-4 to generate a response.
  // - [ ] Repeat untill the interview is over.

  const [recorder, setRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [started, setStarted] = useState(false);
  const [text, setText] = useState("");

  const [jobDesc, setJobDesc] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [conversationHistory, setConversationHistory] = useState([]);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  const getLevelClass = (level) => {
    return (
      "flex glass_btn border w-[33%] border-faint-2" +
      (selectedLevel === level ? " border-white" : "")
    );
  };

  const handleStart = (e) => {
    e.preventDefault();

    if (!jobDesc || !selectedLevel) {
      alert("Please fill out all fields");
      return;
    } else if (jobDesc.length < 50) {
      alert("Please enter a more detailed job description");
      return;
    }

    console.log("Job Description: ", jobDesc);
    console.log("Level: ", selectedLevel);

    setConversationHistory([
      {
        role: "system",
        content:
          "You are an AI interviewer for a company. You are interviewing a candidate for a job based on the job description and role level initially provided. The candidate's responses will be provided by the user. You should start the interview by asking the candidate to introduce themselves, and then ask dynamic questions based on the candidate's responses or move onto a new question if needed. Depending on the role level, adjust the complexity / toughness of your questions, perhaps dig into their responses more. Once you feel you have enough data to conclude the interview, end the interview and give an honest score from 1-10, whether you would have hired them or not, and provide detailed and honest feedback on the interview, avoid discussing the things they were good at, instead mention the things they could have improved.",
      },
      {
        role: "user",
        content: `Job Description: ${jobDesc} Role level: ${selectedLevel}`,
      },
    ]);
  };

  const generateResponse = async (history) => {
    try {
      const { data } = await axios.post("/api/openai/generate", {
        messages: history,
      });

      console.log("GPT Response: ", data);
      return data;
    } catch (error) {
      console.log("Error generating GPT response:", error);
    }
  };

  const playSynthesizedSpeech = async (text) => {
    try {
      const { data } = await axios.post("/api/elevenlabs/speech", {
        text,
      });

      const audio = new Audio(`data:audio/mpeg;base64,${data}`);
      audio.play();
    } catch (error) {
      console.log("Error playing synthesized speech: ", error);
    }
  };

  const startRecording = () => {
    // setText("");
    // navigator.mediaDevices
    //   .getUserMedia({ audio: true })
    //   .then((stream) => {
    //     const audioRecorder = RecordRTC(stream, {
    //       type: "audio",
    //       mimeType: "audio/webm",
    //     });
    //     audioRecorder.startRecording();
    //     setRecorder(audioRecorder);
    //     setRecording(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const stopRecording = async () => {
    // recorder.stopRecording(async () => {
    //   //   invokeSaveAsDialog(recorder.getBlob(), "audio.webm");
    //   setRecording(false);
    //   // Sending recorded audio to the server
    //   const formData = new FormData();
    //   formData.append("audio", recorder.getBlob(), "audio.webm");
    //   try {
    //     const { data } = await axios.post("/api/openai/whisper", { formData });
    //     console.log(data.whisper.text);
    //     setText(data.whisper.text);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
  };

  useEffect(() => {
    if (conversationHistory.length > 0) {
      const fetchGptResponse = async () => {
        // get the latest user message
        const lastMessage = conversationHistory[conversationHistory.length - 1];

        // only generate a response if the last message is from the user
        if (lastMessage.role === "user") {
          // get AI response
          const aiResponse = await generateResponse(conversationHistory);

          // add the AI's response to the conversation history
          const aiResponseText = aiResponse;
          setConversationHistory([
            ...conversationHistory,
            {
              role: "assistant",
              content: aiResponseText,
            },
          ]);

          // convert AI response into speech and play it
          playSynthesizedSpeech(aiResponseText);
        }
      };

      fetchGptResponse();
    }
  }, [conversationHistory]);

  return (
    <section className="flex flex-col gap-5 justify-center text-sm mt-32">
      <p className=" text-center">
        Describe the job role in a few short sentances. This will be given as
        role context which will better forumate the interview
      </p>

      <form onSubmit={handleStart} className="flex flex-col gap-5 items-center">
        <textarea
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="e.g: Software engineering role in a fintech startup, looking for a
            team player to be paid in equity..."
          className="text-white font-lalo h-24 opacity-50 px-3 py-2 w-full text-center outline-0 bg-primary resize-none  border rounded-tl-lg border-faint-2"
        ></textarea>
        <div className="flex justify-between w-full">
          <div
            onClick={() => setSelectedLevel("junior")}
            className={getLevelClass("junior") + " rounded-bl-lg"}
          >
            <p className="px-2 mx-3 my-2">
              Easy • <span className="opacity-50"> Junior</span>
            </p>
          </div>
          <div
            onClick={() => setSelectedLevel("mid")}
            className={getLevelClass("mid")}
          >
            <p className="px-2 mx-3 my-2">
              Medium • <span className="opacity-50"> Mid</span>
            </p>
          </div>
          <div
            onClick={() => setSelectedLevel("senior")}
            className={getLevelClass("senior") + " rounded-br-lg"}
          >
            <p className="px-2 mx-3 my-2">
              Hard • <span className="opacity-50"> Senior</span>
            </p>
          </div>
        </div>

        {/* <div className="flex items-center justify-center"> */}
        <button
          type="submit"
          className="flex glass_btn border w-[33%] border-faint-2 rounded-br-lg "
        >
          <p className="px-2 mx-3 my-2">Start Interview</p>
        </button>
        {/* </div> */}
      </form>

      {/* <button className={recording ? "stop_btn" : "start_btn"}>
        Start Recording
      </button> */}

      <button
        className={recording ? "stop_btn" : "start_btn"}
        onClick={recording ? stopRecording : startRecording}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
    </section>
  );
};

export default Interview;
