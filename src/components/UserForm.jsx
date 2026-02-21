"use client"

import { useState } from "react"
import { createUser, updateUser } from "@/lib/adminActions"

export default function UserForm({ user, onClose }) {
    const isEditing = !!user
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData) {
        setLoading(true)
        try {
            if (isEditing) {
                await updateUser(user.id, {
                    name: formData.get("name"),
                    email: formData.get("email"),
                    role: formData.get("role"),
                })
            } else {
                await createUser({
                    name: formData.get("name"),
                    email: formData.get("email"),
                    password: formData.get("password"),
                    role: formData.get("role"),
                })
            }
            onClose()
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    {isEditing ? "Editar Usuario" : "Nuevo Usuario"}
                </h2>

                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                        <input name="name" type="text" defaultValue={user?.name} required className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input name="email" type="email" defaultValue={user?.email} required className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
                    </div>
                    {!isEditing && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
                            <input name="password" type="password" required className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rol</label>
                        <select name="role" defaultValue={user?.role || "USER"} className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white">
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-700 rounded-lg transition">
                            Cancelar
                        </button>
                        <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition disabled:opacity-50">
                            {loading ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
