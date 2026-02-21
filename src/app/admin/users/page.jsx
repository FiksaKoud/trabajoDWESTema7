import { prisma } from "@/lib/prisma"
import UserManagement from "@/components/UserManagement"

export default async function AdminUsersPage() {
    const users = await prisma.user.findMany({
        orderBy: { role: 'asc' }
    })

    return (
        <div className="max-w-6xl mx-auto p-10">
            <UserManagement initialUsers={users} />
        </div>
    )
}
