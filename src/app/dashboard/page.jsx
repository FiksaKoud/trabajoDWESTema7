import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export default async function DashboardPage() {
    const session = await auth()
    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })

    async function updateProfile(formData) {
        "use server"
        const name = formData.get("name")
        const image = formData.get("image")

        await prisma.user.update({
            where: { email: session.user.email },
            data: { name, image }
        })
        revalidatePath("/dashboard")
    }

    return (
        <div className="max-w-4xl mx-auto p-10 space-y-8">
            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Mi Dashboard</h1>

                <div className="flex items-center space-x-6 mb-8">
                    <img src={user.image || "https://ui-avatars.com/api/?name=" + user.name} className="w-24 h-24 rounded-full border-4 border-blue-500" alt="Avatar" />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{user.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                        <span className="inline-block px-3 py-1 mt-2 text-xs font-bold uppercase rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                            Rol: {user.role}
                        </span>
                    </div>
                </div>

                <form action={updateProfile} className="space-y-6 pt-6 border-t border-gray-100 dark:border-zinc-700">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Modificar Datos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                            <input name="name" type="text" defaultValue={user.name} className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL Imagen</label>
                            <input name="image" type="text" defaultValue={user.image} className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
                        </div>
                    </div>
                    <button type="submit" className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </div>
    )
}
