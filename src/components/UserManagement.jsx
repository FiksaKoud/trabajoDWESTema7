"use client"

import { useState } from "react"
import { deleteUser } from "@/lib/adminActions"
import UserForm from "./UserForm"

export default function UserManagement({ initialUsers }) {
    const [users, setUsers] = useState(initialUsers)
    const [editingUser, setEditingUser] = useState(null)
    const [isCreating, setIsCreating] = useState(false)

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
                <button
                    onClick={() => setIsCreating(true)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition flex items-center gap-2"
                >
                    <span className="text-xl">+</span> Nuevo Usuario
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-zinc-700">
                            <th className="py-4 px-2 font-semibold text-gray-700 dark:text-gray-300">Nombre</th>
                            <th className="py-4 px-2 font-semibold text-gray-700 dark:text-gray-300">Email</th>
                            <th className="py-4 px-2 font-semibold text-gray-700 dark:text-gray-300">Rol</th>
                            <th className="py-4 px-2 font-semibold text-right text-gray-700 dark:text-gray-300">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialUsers.map(user => (
                            <tr key={user.id} className="border-b border-gray-100 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition">
                                <td className="py-4 px-2 font-medium text-gray-900 dark:text-white">{user.name}</td>
                                <td className="py-4 px-2 text-gray-500 dark:text-gray-400">{user.email}</td>
                                <td className="py-4 px-2">
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${user.role === 'ADMIN' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="py-4 px-2 text-right space-x-3">
                                    <button
                                        onClick={() => setEditingUser(user)}
                                        className="text-blue-500 hover:text-blue-700 font-medium transition"
                                    >
                                        Editar
                                    </button>
                                    <form action={async () => {
                                        if (confirm("¿Estás seguro de eliminar a este usuario?")) {
                                            await deleteUser(user.id)
                                        }
                                    }} className="inline">
                                        <button className="text-red-500 hover:text-red-700 font-medium transition">Eliminar</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isCreating && <UserForm onClose={() => setIsCreating(false)} />}
            {editingUser && <UserForm user={editingUser} onClose={() => setEditingUser(null)} />}
        </div>
    )
}
