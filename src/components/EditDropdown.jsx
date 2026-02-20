"use client"

import { useState } from "react"

export default function EditDropdown({ title, children }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="mt-2 border-t pt-4 border-gray-100 dark:border-zinc-700">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
                {isOpen ? 'Cancelar Edición' : title}
            </button>

            {isOpen && (
                <div className="mt-4" onClickCapture={(e) => {
                    if (e.target.tagName === 'BUTTON' && e.target.type !== 'button') {
                        // Wait a bit for the action to start before closing, 
                        // or just close it since Next.js will re-render the page anyway
                        setTimeout(() => setIsOpen(false), 100)
                    }
                }}>
                    {children}
                </div>
            )}
        </div>
    )
}
