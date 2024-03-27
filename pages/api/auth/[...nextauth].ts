import type { NextAuthOptions } from "next-auth";
import { variables } from "@/constants";
import databaseConnection from "@/config/database-connection";
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import bcrypt from "bcrypt";
import UserService from "@/services/user.service";

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
          await databaseConnection();
          const { email, password }: any = credentials;
          const response = await UserService.findUserUsingEmail(email);
          const confirm = bcrypt.compareSync(password, response.password);
          if (confirm) return response
          return null
        } catch (error) {
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },
  secret: variables.ENV.AUTH_SECRET,
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up"
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
    async jwt({ token }) {
      return token;
    }
  }
}

export default NextAuth(authenticationOptions);

