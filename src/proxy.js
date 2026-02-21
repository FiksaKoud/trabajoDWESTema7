import NextAuth from "next-auth"
import authConfig from "./auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { nextUrl } = req

    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")
    const isPublicRoute = ["/", "/auth/login", "/auth/register"].includes(nextUrl.pathname)
    const isAuthRoute = nextUrl.pathname.startsWith("/auth")
    const isAdminRoute = nextUrl.pathname.startsWith("/admin")

    if (isApiAuthRoute) return null

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL("/dashboard", nextUrl))
        }
        return null
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl))
    }

    if (isAdminRoute && req.auth?.user?.role !== "ADMIN") {
        return Response.redirect(new URL("/dashboard", nextUrl))
    }

    return null
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
