import "@styles/globals.css";

export const metadata = {
  title: "InterAI",
  description: "InterAI is a platform for AI-powered language learning",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="body">
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
