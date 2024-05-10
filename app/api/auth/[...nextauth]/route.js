import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

// create a handler that takes in options for the provider

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  // pages: {
  //   signIn: "/auth/signin",
  // },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "#f0fff0", // Hex color code
    logo: "/assets/images/nav_logo.jpeg", // Absolute URL to image
    buttonText: "#110011", // Hex color code
  },
  callbacks: {
    // to get user session, need to sign in user
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        // serverless lamda
        // every next js route is servless which means that this
        // is a lambda funtion that opens up only when it gets called
        // and everytime it gets called it needs to spin up the
        // server and make connection to database
        await connectToDB();

        // check if user exists
        const userExists = await User.findOne({ email: profile.email });
        console.log("userexsits", userExists);
        console.log("profile", profile);
        // if not, create a new user
        if (!userExists) {
          const user = await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
