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

export async function updateConductor(id, formData) {
    await checkAdmin()
    const nombre = formData.get("nombre")
    const telefono = formData.get("telefono")
    await prisma.conductor.update({
        where: { id: parseInt(id) },
        data: { nombre, telefono }
    })
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

export async function updateViaje(id, formData) {
    await checkAdmin()
    const data = {
        fecha_hora: new Date(formData.get("fecha_hora")),
        origen: formData.get("origen"),
        destino: formData.get("destino"),
        precio_billete: parseFloat(formData.get("precio_billete")),
        conductor_id: parseInt(formData.get("conductor_id"))
    }
    await prisma.viaje.update({
        where: { id: parseInt(id) },
        data
    })
    revalidatePath("/viajes")
}

// Pasajeros
export async function createPasajero(formData) {
    await checkAdmin()
    const nombre = formData.get("nombre")
    const bonobus = formData.get("bonobus") === "true"
    await prisma.pasajero.create({ data: { nombre, bonobus } })
    revalidatePath("/pasajeros")
}

export async function updatePasajero(id, formData) {
    await checkAdmin()
    const nombre = formData.get("nombre")
    const bonobus = formData.get("bonobus") === "true"
    await prisma.pasajero.update({
        where: { id: parseInt(id) },
        data: { nombre, bonobus }
    })
    revalidatePath("/pasajeros")
}

export async function deletePasajero(id) {
    await checkAdmin()
    await prisma.pasajero.delete({ where: { id: parseInt(id) } })
    revalidatePath("/pasajeros")
}
