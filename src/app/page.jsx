import Link from "next/link"
import { auth } from "@/auth"

export default async function HomePage() {
    const session = await auth()

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100-navbar)] p-10 bg-gradient-to-b from-blue-50 to-white dark:from-zinc-900 dark:to-zinc-800">
            <div className="text-center space-y-6 max-w-2xl">
                <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                    Gestión de Transporte Eficiente y Segura
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    Bienvenido a TransporteApp. La plataforma definitiva para gestionar conductores, viajes y pasajeros con control total de roles.
                </p>

                <div className="flex justify-center space-x-4 pt-8">
                    {session ? (
                        <Link href="/viajes" className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg transition transform hover:scale-105">
                            Ver Viajes Disponibles
                        </Link>
                    ) : (
                        <>
                            <Link href="/auth/login" className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg transition transform hover:scale-105">
                                Comienza Ahora
                            </Link>
                            <Link href="/auth/register" className="px-8 py-3 text-lg font-semibold text-blue-600 border-2 border-blue-600 hover:bg-blue-50 rounded-2xl transition">
                                Crear Cuenta
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl">
                <FeatureCard title="Seguridad OAuth" description="Registro rápido y seguro mediante Google, GitHub y Discord." icon="🔒" />
                <FeatureCard title="Roles USER/ADMIN" description="Control de acceso granular basado en perfiles de usuario." icon="👥" />
                <FeatureCard title="Gestión de Viajes" description="Visualiza y gestiona conductores y rutas en tiempo real." icon="🚌" />
            </div>
        </div>
    )
}

function FeatureCard({ title, description, icon }) {
    return (
        <div className="p-8 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 hover:shadow-md transition">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-500 dark:text-gray-400">{description}</p>
        </div>
    )
}
