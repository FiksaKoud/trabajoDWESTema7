import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { deleteViaje, createViaje, updateViaje } from "@/lib/transportActions"
import EditDropdown from "@/components/EditDropdown"

export default async function ViajesPage() {
    const session = await auth()
    const viajes = await prisma.viaje.findMany({
        include: { conductor: true },
        orderBy: { fecha_hora: 'desc' }
    })
    const conductores = await prisma.conductor.findMany()
    const isAdmin = session?.user?.role === "ADMIN"

    return (
        <div className="max-w-6xl mx-auto p-10 space-y-12">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">Viajes Programados</h1>
            </div>

            {isAdmin && (
                <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-zinc-700">
                    <h2 className="text-xl font-bold mb-4">Añadir Nuevo Viaje (Solo Admin)</h2>
                    <form action={createViaje} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <input name="fecha_hora" type="datetime-local" required className="p-2 border rounded dark:bg-zinc-700" />
                        <input name="origen" placeholder="Origen" required className="p-2 border rounded dark:bg-zinc-700" />
                        <input name="destino" placeholder="Destino" required className="p-2 border rounded dark:bg-zinc-700" />
                        <input name="precio_billete" type="number" step="0.01" placeholder="Precio" required className="p-2 border rounded dark:bg-zinc-700" />
                        <select name="conductor_id" required className="p-2 border rounded dark:bg-zinc-700">
                            {conductores.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                        </select>
                        <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">Guardar Viaje</button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {viajes.map(v => (
                    <div key={v.id} className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border hover:shadow-md transition flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm font-bold text-blue-600 uppercase mb-1">{new Date(v.fecha_hora).toLocaleString()}</p>
                                <h3 className="text-xl font-bold">{v.origen} → {v.destino}</h3>
                                <p className="text-gray-500 mt-2">Conductor: <span className="text-gray-900 dark:text-gray-200 font-medium">{v.conductor.nombre}</span></p>
                                <p className="text-lg font-bold text-green-600 mt-1">{v.precio_billete}€</p>
                            </div>
                            {isAdmin && (
                                <form action={async () => { "use server"; await deleteViaje(v.id) }}>
                                    <button className="text-red-500 hover:text-red-700 text-sm font-medium">Eliminar</button>
                                </form>
                            )}
                        </div>

                        {isAdmin && (
                            <EditDropdown title="Editar Detalles">
                                <form action={async (formData) => { "use server"; await updateViaje(v.id, formData) }} className="mt-4 grid grid-cols-1 gap-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col">
                                            <label className="text-xs text-gray-400 mb-1">Fecha y Hora</label>
                                            <input name="fecha_hora" type="datetime-local" defaultValue={new Date(v.fecha_hora).toISOString().slice(0, 16)} required className="p-2 text-sm border rounded dark:bg-zinc-700" title="Fecha y Hora del viaje" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-xs text-gray-400 mb-1">Precio</label>
                                            <input name="precio_billete" type="number" step="0.01" defaultValue={v.precio_billete} required className="p-2 text-sm border rounded dark:bg-zinc-700" title="Precio del billete" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col">
                                            <label className="text-xs text-gray-400 mb-1">Origen</label>
                                            <input name="origen" defaultValue={v.origen} required className="p-2 text-sm border rounded dark:bg-zinc-700" title="Lugar de origen" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-xs text-gray-400 mb-1">Destino</label>
                                            <input name="destino" defaultValue={v.destino} required className="p-2 text-sm border rounded dark:bg-zinc-700" title="Lugar de destino" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-xs text-gray-400 mb-1">Conductor</label>
                                        <select name="conductor_id" defaultValue={v.conductor_id} required className="p-2 text-sm border rounded dark:bg-zinc-700" title="Seleccionar conductor">
                                            {conductores.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                                        </select>
                                    </div>
                                    <button className="w-full bg-blue-600 text-white p-2 text-sm rounded hover:bg-blue-700 transition">Guardar Cambios</button>
                                </form>
                            </EditDropdown>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
