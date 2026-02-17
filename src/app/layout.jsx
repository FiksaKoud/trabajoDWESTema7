import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Transporte App - Gestión de Viajes",
    description: "Funcionalidad de transporte y autenticación",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100`}>
                <Navbar />
                <main>
                    {children}
                </main>
                <Toaster position="top-center" richColors />
            </body>
        </html>
    );
}
