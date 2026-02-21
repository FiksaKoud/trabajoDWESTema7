"use client"

import { login } from "@/lib/actions"
import { signIn } from "next-auth/react" // Use client-side signIn for the buttons
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
    const searchParams = useSearchParams()
    const error = searchParams.get("error")

    const getErrorMessage = (error) => {
        switch (error) {
            case "OAuthAccountNotLinked":
                return "Este email ya está vinculado a otra cuenta. Inicia sesión con el método original."
            case "OAuthCallbackError":
                return "Se canceló el inicio de sesión o hubo un problema con el proveedor."
            case "AccessDenied":
                return "Acceso denegado. Debes autorizar la aplicación para entrar."
            case "CredentialsSignin":
                return "Email o contraseña incorrectos."
            default:
                return "Ocurrió un error inesperado en la autenticación."
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900 p-6">
            <div className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-8 space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Iniciar Sesión</h1>

                {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-100 border border-red-200 rounded-lg">
                        {getErrorMessage(error)}
                    </div>
                )}

                <form action={login} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input name="email" type="email" required className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
                        <input name="password" type="password" required className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
                    </div>
                    <button type="submit" className="w-full py-3 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-200">
                        Entrar
                    </button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-300 dark:border-zinc-600"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-zinc-800 px-2 text-gray-500">O continúa con</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                        className="flex items-center justify-center w-full p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition"
                    >
                        <img src="https://authjs.dev/img/providers/google.svg" className="h-5 w-5" alt="Google" />
                    </button>
                    <button
                        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                        className="flex items-center justify-center w-full p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition"
                    >
                        <img src="https://authjs.dev/img/providers/github.svg" className="h-5 w-5" alt="Github" />
                    </button>
                    <button
                        onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
                        className="flex items-center justify-center w-full p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition"
                    >
                        <img src="https://authjs.dev/img/providers/discord.svg" className="h-5 w-5" alt="Discord" />
                    </button>
                </div>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    ¿No tienes cuenta? <Link href="/auth/register" className="text-blue-600 hover:underline">Regístrate</Link>
                </p>
            </div>
        </div>
    )
}
