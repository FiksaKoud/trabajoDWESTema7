import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { createPasajero, updatePasajero, deletePasajero } from "@/lib/transportActions"
import EditDropdown from "@/components/EditDropdown"

export default async function PasajerosPage() {
    const session = await auth()
    const pasajeros = await prisma.pasajero.findMany()
    const isAdmin = session?.user?.role === "ADMIN"

    return (
        <div className="max-w-6xl mx-auto p-10 space-y-12">
            <h1 className="text-4xl font-bold">Gestión de Pasajeros</h1>

            {isAdmin && (
                <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-zinc-700">
                    <h2 className="text-xl font-bold mb-4">Nuevo Pasajero (Solo Admin)</h2>
                    <form action={createPasajero} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <input name="nombre" placeholder="Nombre completo" required className="p-2 border rounded dark:bg-zinc-700" />
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" name="bonobus" value="true" id="bonobus" />
                            <label htmlFor="bonobus">¿Tiene Bonobús?</label>
                        </div>
                        <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">Añadir</button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {pasajeros.map(p => (
                    <div key={p.id} className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border text-center">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                            {p.nombre[0]}
                        </div>
                        <h3 className="text-xl font-bold">{p.nombre}</h3>
                        <p className={p.bonobus ? "text-green-500 font-medium" : "text-gray-400"}>
                            {p.bonobus ? 'Tiene Bonobús' : 'Sin Bonobús'}
                        </p>

                        {isAdmin && (
                            <div className="mt-6 space-y-4">
                                <EditDropdown title="Editar">
                                    <form action={async (formData) => { "use server"; await updatePasajero(p.id, formData) }} className="mt-2 space-y-2 text-left">
                                        <input name="nombre" defaultValue={p.nombre} required className="w-full p-1 text-sm border rounded dark:bg-zinc-700" />
                                        <div className="flex items-center space-x-2 text-sm">
                                            <input type="checkbox" name="bonobus" value="true" defaultChecked={p.bonobus} />
                                            <label>¿Bonobús?</label>
                                        </div>
                                        <button className="w-full bg-blue-600 text-white p-1 text-sm rounded">Guardar</button>
                                    </form>
                                </EditDropdown>
                                <form action={async () => { "use server"; await deletePasajero(p.id) }}>
                                    <button className="text-red-500 hover:text-red-700 text-sm font-medium">Eliminar</button>
                                </form>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
