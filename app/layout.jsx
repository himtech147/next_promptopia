import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "Promptogram",
  description: "Platform to share AI prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <NextTopLoader color="green" showSpinner={false} />

        {/* next auth uses the front end layout and as well as the backend next api */}
        {/* ie we setup this in /api/auth/[...nextauth] */}
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
