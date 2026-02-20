import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { deleteConductor, createConductor, updateConductor } from "@/lib/transportActions"
import EditDropdown from "@/components/EditDropdown"

export default async function ConductoresPage() {
    const session = await auth()
    const conductores = await prisma.conductor.findMany({
        include: { viajes: true }
    })
    const isAdmin = session?.user?.role === "ADMIN"

    return (
        <div className="max-w-6xl mx-auto p-10 space-y-12">
            <h1 className="text-4xl font-bold">Nuestros Conductores</h1>

            {isAdmin && (
                <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-zinc-700">
                    <h2 className="text-xl font-bold mb-4">Nuevo Conductor (Solo Admin)</h2>
                    <form action={createConductor} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <input name="nombre" placeholder="Nombre completo" required className="p-2 border rounded dark:bg-zinc-700" />
                        <input name="telefono" placeholder="Teléfono" className="p-2 border rounded dark:bg-zinc-700" />
                        <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">Añadir</button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {conductores.map(c => (
                    <div key={c.id} className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border text-center">
                        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                            {c.nombre[0]}
                        </div>
                        <h3 className="text-xl font-bold">{c.nombre}</h3>
                        <p className="text-gray-500">{c.telefono || 'Sin teléfono'}</p>
                        <p className="mt-4 text-sm text-gray-400 font-medium uppercase tracking-wider">{c.viajes.length} Viajes completados</p>

                        {isAdmin && (
                            <div className="mt-6 space-y-4">
                                <EditDropdown title="Editar">
                                    <form action={async (formData) => { "use server"; await updateConductor(c.id, formData) }} className="space-y-2 text-left">
                                        <input name="nombre" defaultValue={c.nombre} required className="w-full p-1 text-sm border rounded dark:bg-zinc-700" />
                                        <input name="telefono" defaultValue={c.telefono || ''} className="w-full p-1 text-sm border rounded dark:bg-zinc-700" />
                                        <button className="w-full bg-blue-600 text-white p-1 text-sm rounded">Guardar</button>
                                    </form>
                                </EditDropdown>
                                <form action={async () => { "use server"; await deleteConductor(c.id) }}>
                                    <button className="text-red-500 hover:text-red-700 text-sm font-medium">Dar de baja</button>
                                </form>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
