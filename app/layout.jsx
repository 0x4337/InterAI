import "@styles/globals.css";

// COMPONENTS
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "InterAI",
  description: "InterAI is a platform for AI-powered language learning",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="body">
        <Provider>
          <Nav />
          <main className="app">{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
