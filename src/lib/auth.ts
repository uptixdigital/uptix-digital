import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"
import { getEnv } from "./env"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    newUser: "/auth/register",
  },
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // Credentials Provider
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("[AUTH] Missing credentials")
            // Return null with generic message - don't reveal if email exists
            return null
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          })

          if (!user) {
            console.log("[AUTH] User not found:", credentials.email)
            // Generic error - don't reveal user existence
            return null
          }

          if (!user.password) {
            console.log("[AUTH] User has no password:", credentials.email)
            // Generic error - don't reveal authentication method
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            console.log("[AUTH] Invalid password for:", credentials.email)
            // Generic error
            return null
          }

          console.log("[AUTH] User authorized:", user.email, "Role:", user.role)

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image,
          }
        } catch (error) {
          console.error("[AUTH] Authorize error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("[AUTH] Sign in attempt:", user?.email, "Provider:", account?.provider)
      
      // Handle Google OAuth sign in
      if (account?.provider === "google") {
        try {
          // Check if user exists
          let dbUser = await prisma.user.findUnique({
            where: { email: user.email! },
          })
          
          if (!dbUser) {
            // Create new user from Google OAuth
            dbUser = await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name,
                image: user.image,
                role: "CLIENT", // Default role for OAuth users
                emailVerified: new Date(),
              },
            })
            console.log("[AUTH] New user created from Google OAuth:", user.email)
          }
          
          // Update user object with database values
          user.id = dbUser.id
          user.role = dbUser.role
          user.image = dbUser.image
        } catch (error) {
          console.error("[AUTH] Google sign in error:", error)
          return false
        }
      }
      
      return true
    },
    async session({ token, session }) {
      try {
        // If no session or no user, return session as-is (null/undefined)
        if (!session || !session.user) {
          return session || { user: null }
        }
        
        // Only populate if we have a valid token
        if (token && token.email) {
          session.user.id = token.id as string
          session.user.name = token.name as string | null
          session.user.email = token.email as string
          session.user.image = token.picture as string | null
          session.user.role = (token.role as "ADMIN" | "CLIENT") || "CLIENT"
        }
        return session
      } catch (error) {
        console.error("[AUTH] Session callback error:", error)
        return session
      }
    },
    async jwt({ token, user, trigger, session }) {
      try {
        // Initial sign in
        if (user) {
          return {
            id: user.id,
            name: user.name || null,
            email: user.email,
            picture: user.image || null,
            role: user.role || "CLIENT",
          }
        }

        // Handle session update
        if (trigger === "update" && session) {
          return { ...token, ...session }
        }

        // Return token if user still exists
        if (token.email) {
          try {
            const dbUser = await prisma.user.findFirst({
              where: {
                email: token.email as string,
              },
            })

            if (dbUser) {
              return {
                id: dbUser.id,
                name: dbUser.name || null,
                email: dbUser.email,
                picture: dbUser.image || null,
                role: dbUser.role || "CLIENT",
              }
            }
          } catch (dbError) {
            console.error("[AUTH] Database error in JWT:", dbError)
            // Return existing token on DB error
            return token
          }
        }

        return token
      } catch (error) {
        console.error("[AUTH] JWT callback error:", error)
        return token
      }
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log("[AUTH] User signed in:", user?.email)
    },
    async signOut({ token }) {
      console.log("[AUTH] User signed out:", token?.email)
    },
  },
  debug: false, // Disabled to reduce console spam
}

// Helper function for server components
export const auth = async () => {
  try {
    const { getServerSession } = await import("next-auth/next")
    const session = await getServerSession(authOptions)
    return session
  } catch (error) {
    console.error("[AUTH] Auth helper error:", error)
    return null
  }
}

// For API routes
export { authOptions as config }
