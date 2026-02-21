import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Discord from "next-auth/providers/discord"

export default {
    providers: [
        Google({
            allowDangerousEmailAccountLinking: true,
            authorization: { params: { prompt: "select_account" } }
        }),
        GitHub({
            allowDangerousEmailAccountLinking: true,
            authorization: { params: { prompt: "select_account" } }
        }),
        Discord({
            allowDangerousEmailAccountLinking: true,
            authorization: { params: { prompt: "select_account" } }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user && token.role) {
                session.user.role = token.role
            }
            return session
        }
    },
    pages: {
        signIn: "/auth/login",
    }
}
