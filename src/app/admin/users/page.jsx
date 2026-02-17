import { prisma } from "@/lib/prisma"
import { deleteUser } from "@/lib/adminActions"

export default async function AdminUsersPage() {
    const users = await prisma.user.findMany({
        orderBy: { role: 'asc' }
    })

    return (
        <div className="max-w-6xl mx-auto p-10">
            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-zinc-700">
                                <th className="py-4 px-2 font-semibold">Nombre</th>
                                <th className="py-4 px-2 font-semibold">Email</th>
                                <th className="py-4 px-2 font-semibold">Rol</th>
                                <th className="py-4 px-2 font-semibold text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b border-gray-100 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition">
                                    <td className="py-4 px-2 font-medium">{user.name}</td>
                                    <td className="py-4 px-2 text-gray-500">{user.email}</td>
                                    <td className="py-4 px-2">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${user.role === 'ADMIN' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2 text-right space-x-2">
                                        <form action={async () => {
                                            "use server"
                                            await deleteUser(user.id)
                                        }} className="inline">
                                            <button className="text-red-500 hover:text-red-700 font-medium">Eliminar</button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
