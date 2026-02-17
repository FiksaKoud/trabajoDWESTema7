"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"
import { auth } from "@/auth"

async function checkAdmin() {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") {
        throw new Error("No autorizado")
    }
}

export async function deleteUser(userId) {
    await checkAdmin()
    await prisma.user.delete({ where: { id: userId } })
    revalidatePath("/admin/users")
}

export async function updateUser(userId, data) {
    await checkAdmin()
    await prisma.user.update({
        where: { id: userId },
        data: {
            name: data.name,
            email: data.email,
            role: data.role,
            active: data.active === "true"
        }
    })
    revalidatePath("/admin/users")
}

export async function createUser(data) {
    await checkAdmin()
    const hashedPassword = await bcrypt.hash(data.password, 10)
    await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role,
        }
    })
    revalidatePath("/admin/users")
}
