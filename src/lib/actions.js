"use server"

import { signIn, signOut } from "@/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { AuthError } from "next-auth"

export async function register(formData) {
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")

    if (!email || !password || !name) {
        return { error: "Todos los campos son obligatorios" }
    }

    const existingUser = await prisma.user.findUnique({
        where: { email }
    })

    if (existingUser) {
        return { error: "El email ya está registrado" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "USER" // Default role for registration
            }
        })
        return { success: "Usuario registrado correctamente" }
    } catch (error) {
        return { error: "Error al registrar el usuario" }
    }
}

export async function login(formData) {
    const email = formData.get("email")
    const password = formData.get("password")

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Credenciales inválidas" }
                default:
                    return { error: "Algo salió mal" }
            }
        }
        throw error
    }
}

export async function logout() {
    await signOut({ redirectTo: "/" })
}
