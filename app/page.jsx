import Link from "next/link";

const Home = () => {
  return (
    <section className="w-full h-screen flex justify-center ">
      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-3xl glass px-2 py-1 border-black ">InterAI</h1>

        <p className="text-center glass border border-black p-2">
          InterAI is a platform that llows you to practice your interview skills
          with dynamic, AI powered questions and responses
        </p>

        <Link href="/profile">Start Interview</Link>
      </div>
    </section>
  );
};

export default Home;
