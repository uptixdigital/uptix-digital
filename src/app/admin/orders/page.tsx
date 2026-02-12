import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DashboardShell } from "@/components/dashboard/admin-shell"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Manage Orders | Uptix Digital",
  description: "View and manage all customer orders.",
}

export default async function AdminOrdersPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/auth/login")
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  })

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-500/10 text-yellow-400",
    IN_PROGRESS: "bg-blue-500/10 text-blue-400",
    REVIEW: "bg-purple-500/10 text-purple-400",
    DONE: "bg-green-500/10 text-green-400",
    CANCELLED: "bg-red-500/10 text-red-400",
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Manage Orders"
        text="View and manage all customer orders."
      />
      
      <div className="grid gap-4">
        {orders.length === 0 ? (
          <Card className="glass-card border-white/10">
            <CardContent className="pt-6">
              <p className="text-slate-400 text-center">No orders found.</p>
            </CardContent>
          </Card>
        ) : (
          orders.map((order) => (
            <Card key={order.id} className="glass-card border-white/10">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-lg">{order.title}</CardTitle>
                    <p className="text-slate-400 text-sm">
                      By {order.user.name || order.user.email}
                    </p>
                  </div>
                  <Badge className={statusColors[order.status]}>
                    {order.status.replace("_", " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">{order.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <Link 
                    href={`/admin/orders/${order.id}`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View Details →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </DashboardShell>
  )
}
