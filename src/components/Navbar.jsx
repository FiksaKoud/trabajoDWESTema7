import Link from "next/link"
import { auth, signOut } from "@/auth"

export default async function Navbar() {
    const session = await auth()

    return (
        <nav className="bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                TransporteApp
            </Link>

            <div className="flex items-center space-x-6">
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition">Inicio</Link>
                <Link href="/viajes" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition">Viajes</Link>
                <Link href="/conductores" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition">Conductores</Link>

                {session && (
                    <>
                        <Link href="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition">Mi Perfil</Link>
                        {session.user.role === "ADMIN" && (
                            <Link href="/admin/users" className="text-red-500 hover:text-red-600 transition font-medium">Usuarios (Admin)</Link>
                        )}
                    </>
                )}

                {session ? (
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{session.user.name || session.user.email}</span>
                        <form action={async () => {
                            "use server"
                            await signOut({ redirectTo: "/" })
                        }}>
                            <button type="submit" className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition">Salir</button>
                        </form>
                    </div>
                ) : (
                    <div className="space-x-3">
                        <Link href="/auth/login" className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition">Entrar</Link>
                        <Link href="/auth/register" className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">Registro</Link>
                    </div>
                )}
            </div>
        </nav>
    )
}
