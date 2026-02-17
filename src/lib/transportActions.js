"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

async function checkAdmin() {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") {
        throw new Error("No autorizado. Solo administradores pueden realizar esta acción.")
    }
}

// Conductores
export async function createConductor(formData) {
    await checkAdmin()
    const nombre = formData.get("nombre")
    const telefono = formData.get("telefono")
    await prisma.conductor.create({ data: { nombre, telefono } })
    revalidatePath("/conductores")
}

export async function deleteConductor(id) {
    await checkAdmin()
    await prisma.conductor.delete({ where: { id: parseInt(id) } })
    revalidatePath("/conductores")
}

// Viajes
export async function createViaje(formData) {
    await checkAdmin()
    const data = {
        fecha_hora: new Date(formData.get("fecha_hora")),
        origen: formData.get("origen"),
        destino: formData.get("destino"),
        precio_billete: parseFloat(formData.get("precio_billete")),
        conductor_id: parseInt(formData.get("conductor_id"))
    }
    await prisma.viaje.create({ data })
    revalidatePath("/viajes")
}

export async function deleteViaje(id) {
    await checkAdmin()
    await prisma.viaje.delete({ where: { id: parseInt(id) } })
    revalidatePath("/viajes")
}
