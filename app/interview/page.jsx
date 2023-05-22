import React from "react";

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

  let recording = false;

  return (
    <section className="flex flex-col gap-5 justify-center mt-32">
      <p className="text-sm text-center">
        Describe the job role in a few short sentances. This will be given as
        role context which will better forumate the interview
      </p>

      <form className="flex flex-col gap-5 items-center">
        <textarea
          placeholder="e.g: Software engineering role in a fintech startup, looking for a
            team player to be paid in equity..."
          className="text-white font-lalo h-24 opacity-50 px-3 py-2 w-full text-center outline-0 bg-primary resize-none text-sm border rounded-tl-lg border-faint-2"
        ></textarea>
        <div className="flex justify-between w-full">
          <button className="flex glass_btn border w-[33%] 	 border-faint-2 rounded-bl-lg text-sm">
            <p className="px-2 mx-3 my-2">
              Easy • <span className="opacity-50"> Junior</span>
            </p>
          </button>
          <button className="flex glass_btn border w-[33%]	 border-faint-2 text-sm">
            <p className="px-2 mx-3 my-2">
              Medium • <span className="opacity-50"> Mid</span>
            </p>
          </button>
          <button className="flex glass_btn border w-[33%]	 border-faint-2 rounded-br-lg text-sm">
            <p className="px-2 mx-3 my-2">
              Hard • <span className="opacity-50"> Senior</span>
            </p>
          </button>
        </div>

        {/* <div className="flex items-center justify-center"> */}
        <button className="flex glass_btn border w-[33%] border-faint-2 rounded-br-lg text-sm">
          <p className="px-2 mx-3 my-2">Start Interview</p>
        </button>
        {/* </div> */}
      </form>

      <button className={recording ? "stop_btn" : "start_btn"}>
        Start Recording
      </button>
    </section>
  );
};

export default Interview;
