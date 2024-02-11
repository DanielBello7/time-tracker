import type { NextAuthOptions } from "next-auth";
import { sync_database_connection } from "@/lib/database-connection";
import { variables } from "@/constants";
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import bcrypt from "bcrypt";
import UserService from "@/services/users.service";


UserService.getUsers()
  .then((e) => console.log(e))
  .catch((ee) => console.log(ee));

export const authenticationOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" }
      },
      async authorize(credentials): Promise<any> {
        try {
          const { email, password }: any = credentials;
          console.log("here")
          // const response = await UserService.findUserUsingEmail(email);
          // const confirm = bcrypt.compareSync(password, response.password);
          // if (confirm) return response;
          return null
        } catch (error) {
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: variables.ENV.AUTH_SECRET,
  pages: {
    signIn: "/sign-in"
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    }
  }
}

export default NextAuth(authenticationOptions);
