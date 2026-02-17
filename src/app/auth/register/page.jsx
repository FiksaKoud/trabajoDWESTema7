"use client"

import { register } from "@/lib/actions"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function RegisterPage() {
    const [error, setError] = useState("")
    const router = useRouter()

    async function handleSubmit(formData) {
        const res = await register(formData)
        if (res?.error) {
            setError(res.error)
            toast.error(res.error)
        } else {
            toast.success("Cuenta creada correctamente. Ahora puedes iniciar sesión.")
            router.push("/auth/login")
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900 p-6">
            <div className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-8 space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Crear Cuenta</h1>

                <form action={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded">{error}</p>}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre Completo</label>
                        <input name="name" type="text" required className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input name="email" type="email" required className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
                        <input name="password" type="password" required className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
                    </div>
                    <button type="submit" className="w-full py-3 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-200">
                        Registrarse
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    ¿Ya tienes cuenta? <Link href="/auth/login" className="text-blue-600 hover:underline">Inicia sesión</Link>
                </p>
            </div>
        </div>
    )
}
