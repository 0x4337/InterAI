import Link from "next/link";
import Image from "next/image";

const Home = () => {
  return (
    <section className="w-full h-screen flex justify-center ">
      <video className="fixed -z-10 top-40 md:top-0" autoPlay loop muted>
        <source src="/assets/video/glassPanels.mp4" type="video/mp4" />
      </video>

      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-3xl glass px-2 py-1">InterAI</h1>

        <p className="text-center glass p-2 text-sm">
          InterAI is a platform that llows you to practice your interview skills
          with dynamic, AI powered questions and responses
        </p>

        <Link className="glass p-1" href="/interview">
          Start Interview
        </Link>
      </div>
    </section>
  );
};

export default Home;
